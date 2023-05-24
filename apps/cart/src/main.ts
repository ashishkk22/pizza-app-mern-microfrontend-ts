import('./bootstrap').then(({ mount }) => {
  const localRoot = document.getElementById('cart');
  mount({
    mountPoint: localRoot!,
    routingStrategy: 'browser',
  });
});
