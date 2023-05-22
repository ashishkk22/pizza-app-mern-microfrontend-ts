import('./bootstrap').then(({ mount }) => {
  const localRoot = document.getElementById('auth');
  mount({
    mountPoint: localRoot!,
    routingStrategy: 'browser',
  });
});
