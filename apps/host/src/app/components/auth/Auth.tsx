import React, { useEffect, useRef } from 'react';
import { mount } from 'auth/Module';
import { useLocation, useNavigate } from 'react-router-dom';
import { authRoutingPrefix } from '../../constants/mfeRouts';

const authAppName = `/${authRoutingPrefix}`;

export default () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  // Listen to navigation events dispatched inside auth mfe.
  useEffect(() => {
    const app1NavigationEventHandler = (event: Event) => {
      const pathname = (event as CustomEvent<string>).detail;
      const newPathname = `${authAppName}${pathname}`;

      if (newPathname === location.pathname) return;

      //as the on the home we are redirecting to host home
      if (pathname === '/') {
        navigate('/');
        return;
      }
      navigate(newPathname);
    };
    window.addEventListener('[user] navigated', app1NavigationEventHandler);

    return () => {
      window.removeEventListener(
        '[user] navigated',
        app1NavigationEventHandler
      );
    };
  }, [location, navigate]);

  // Listen for host location changes and dispatch a notification.
  useEffect(() => {
    if (location.pathname.startsWith(authAppName)) {
      window.dispatchEvent(
        new CustomEvent('[host] navigated', {
          detail: location.pathname.replace(authAppName, ''),
        })
      );
    }
  }, [location]);

  const isFirstRunRef = useRef(true);

  const unmountRef = useRef(() => {
    /* */
  });

  useEffect(() => {
    const unmountFunction = unmountRef.current;
    return () => {
      unmountFunction();
    };
  }, []);

  useEffect(() => {
    if (!isFirstRunRef.current) {
      return;
    }
    unmountRef.current = mount({
      mountPoint: wrapperRef.current!,
      initialPathname: location.pathname.replace(authAppName, ''),
    });
    isFirstRunRef.current = false;
  }, [location]);

  return <div ref={wrapperRef} id="auth-app" />;
};
