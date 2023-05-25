import React, { useEffect, useRef } from 'react';
import { mount } from 'auth/Module';
import { useLocation, useNavigate } from 'react-router-dom';
import { authRoutingPrefix } from '../../constants/mfeRouts';

const app1Basename = `/${authRoutingPrefix}`;

export default () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  // Listen to navigation events dispatched inside app1 mfe.
  useEffect(() => {
    const app1NavigationEventHandler = (event: Event) => {
      const pathname = (event as CustomEvent<string>).detail;

      const newPathname = `${app1Basename}${pathname}`;

      if (newPathname === location.pathname) {
        return;
      }
      navigate(newPathname);
    };
    window.addEventListener('[auth] navigated', app1NavigationEventHandler);

    return () => {
      window.removeEventListener(
        '[auth] navigated',
        app1NavigationEventHandler
      );
    };
  }, [location, navigate]);

  // Listen for shell location changes and dispatch a notification.
  useEffect(() => {
    if (location.pathname.startsWith(app1Basename)) {
      window.dispatchEvent(
        new CustomEvent('[host] navigated', {
          detail: location.pathname.replace(app1Basename, ''),
        })
      );
    }
  }, [location]);

  const isFirstRunRef = useRef(true);

  const unmountRef = useRef(() => {
    /* */
  });

  useEffect(() => {
    const fn = unmountRef.current;
    return () => {
      fn();
    };
  }, []);

  useEffect(() => {
    if (!isFirstRunRef.current) {
      return;
    }
    unmountRef.current = mount({
      mountPoint: wrapperRef.current!,
      initialPathname: location.pathname.replace(app1Basename, ''),
    });
    console.log(unmountRef.current);
    isFirstRunRef.current = false;
  }, [location]);

  return <div ref={wrapperRef} id="auth-app" />;
};
