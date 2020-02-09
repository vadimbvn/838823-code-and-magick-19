'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_SHADOW = 'rgba(0, 0, 0, 0.7)';
var GAP = 10;
var FONT_GAP = 20;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;
var TEXT_FONT = '16px PT Mono';
var FONT_COLOR = '#000';
var TEXT_BASELINE = 'hanging';
var WIN_MESSAGE = ['Ура, вы победили!', 'Список результатов:'];

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_SHADOW);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = FONT_COLOR;
  ctx.font = TEXT_FONT;
  ctx.textBaseline = TEXT_BASELINE;

  for (var i = 0; i < WIN_MESSAGE.length; i++) {
    ctx.fillText(WIN_MESSAGE[i], CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP + (FONT_GAP * i));
  }

  var maxTime = getMaxElement(times);

  for (var j = 0; j < names.length; j++) {
    ctx.fillStyle = FONT_COLOR;
    ctx.fillText(names[j], CLOUD_X + BAR_WIDTH + (BAR_GAP + BAR_WIDTH) * j, CLOUD_HEIGHT - FONT_GAP);
    ctx.fillText(Math.round(times[j]), CLOUD_X + BAR_WIDTH + (BAR_GAP + BAR_WIDTH) * j, CLOUD_Y + CLOUD_HEIGHT - FONT_GAP * 3 - (BAR_HEIGHT * times[j]) / maxTime);
    ctx.fillStyle = names[j] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(232,' + getRandomNumber(1, 100) + '%, 50%)';
    ctx.fillRect(CLOUD_X + BAR_WIDTH + (BAR_GAP + BAR_WIDTH) * j, CLOUD_Y + CLOUD_HEIGHT - FONT_GAP * 2 - (BAR_HEIGHT * times[j]) / maxTime, BAR_WIDTH, (BAR_HEIGHT * times[j]) / maxTime);
  }
};
