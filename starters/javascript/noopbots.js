const API_BASE = 'https://api.noopschallenge.com';

function NOOPBOT_START() {
  console.log(`Noop Noop! 🤖🤖🤖🤖🤖`);
  if (window.start_app) {
    start_app();
  } else {
    console.error('start_app not defined');
  }
}

function NOOPBOT_FETCH(options, onComplete) {

  if (!options.API) {
    console.error('API not set');
    return;
  }

  if (!onComplete) {
    console.warn('onComplete not set, nothing will happen.');
  }

  let params = [];
  Object.keys(options).forEach(key => params.push(`${key}=${options[key]}`))
  let url = `${API_BASE}/${options.API}?` + params.join('&');

  window.fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(responseJson) {
      onComplete(responseJson)
    });
}

function NOOPBOT_SETUP_CANVAS(options) {

  if (!options) {
    console.error("No options provided to SETUP_CANVAS");
    return;
  }

  if (!canvas || !options.canvas.getContext) {
    console.error("No canvas, we're in for a bad time...");
    return;
  }

  let width = options.width || window.innerWidth;
  let height = options.height || window.innerHeight;

  let ctx = options.canvas.getContext('2d');

  ctx.canvas.width  = width;
  ctx.canvas.height = height;

  ctx.fillStyle = options.bgColor || '#f1f1f1';
  ctx.fillRect(0, 0, width, height);
  return ctx
}

function NOOPBOT_TICK_SETUP(onTick, interval) {
  return setInterval(onTick, interval);
}

function NOOPBOT_TICK_STOP(intervalId) {
  clearInterval(intervalId);
}

function NOOPBOT_DECIDE(set) {
  if (!set || !set.length) {
    return null;
  }
  return set[Math.floor(Math.random()*set.length)];
}

function NOOPBOT_DECIDE_POINT(width, height) {
  return {
    x: NOOPBOT_RANDOM(0, width),
    y: NOOPBOT_RANDOM(0, height)
  };
}

function NOOPBOT_RANDOM(min, max) {
  return min + Math.floor(Math.random()*(max-min));
}

window.onload = function (event) {
  NOOPBOT_START();
};
