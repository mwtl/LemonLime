let config;
let message = {};
let hovered = false;

function logEvent(event) {
    if (!config.logProxyUrl) return;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', config.logProxyUrl, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(JSON.stringify(event));
  }

function hash(data) {
  var hash = 0, i, chr;
  if (data.length === 0) return hash;
  for (i = 0; i < data.length; i++) {
    chr   = data.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function utoa(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

window.addEventListener('lemonpi.config/ready', event => {
  config = event.detail;
  message.placeholder = true;
  message.adsetId = config.adsetId;
  message.creativeId = config.creativeId;
})

window.addEventListener('lemonpi.content/ready', event => {
  content = event.detail.content;

  message.content_hash = hash(JSON.stringify(content));
  message.content_encoded = utoa(JSON.stringify(content));
  message.content_source = event.detail.source;
  message.content_json = content;
  message.ph_event = "content/ready";
  //message.ph_context = JSON.parse(content.used_context.value);
  logEvent(message);

})

window.addEventListener('lemonpi.interaction/impression', event => {
  message.ph_event = "interaction/impression";
  logEvent(message);
})

document.getElementById('creative_container').addEventListener('mouseover', event => {
  if(!hovered){
    message.ph_event = "interaction/hover";
    logEvent(message);
    hovered = true;
  }
})

document.getElementById('creative_container').addEventListener('click', event => {
  message.ph_event = "interaction/click/" + event.target.id;
  logEvent(message);

})

var d = document.getElementById('creative_container');

function logTimeSpent(t, i) {
  message.ph_event  = "interaction/time_spent_in_banner";
  message.timePassed = i;
  message.timeCount = t;
  logEvent(message);
  delete message.ev;
  delete message.timePassed;
}

function trackTimeInBanner() {
  var t, o = this,
    r = 0,
    a = 0,
    c = [3, 5, 7, 9, 11, 12, 15, 20, 25, 30, 40, 50, 60],
    s = [];
  var ival = 500;
  d.addEventListener("mouseenter", function() {
    a = (new Date).getTime(), t = setInterval(function() {
      var e, t, n = (new Date).getTime();
      r += n - a, a = n;
      var i = Math.round(r / 1e3); - 1 < c.indexOf(i) && -1 === s.indexOf(i) && (e = s[s.length - 1], s.push(i), t = e ? i - e : i, logTimeSpent(i, ival))
    }, ival)
  }), d.addEventListener("mouseleave", function() {
    clearInterval(t)
  })
}

trackTimeInBanner();
