function rand(min = 0, max = 60) {
  const mi = Math.ceil(min);
  const ma = Math.floor(max);

  return Math.floor(Math.random() * (ma - mi)) + mi;
}

export default rand;
