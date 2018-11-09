'use strict';

var _ = require('./utils');

// Enable followers-only mode on a channel..
function followersonly(channel, minutes) {
  var _this = this;

  channel = _.channel(channel);
  minutes = _.get(minutes, 30);

  // Send the command to the server and race the Promise against a delay..
  return this._sendCommand(this._getPromiseDelay(), channel, '/followers ' + minutes, function (resolve, reject) {
    // Received _promiseFollowers event, resolve or reject..
    _this.once('_promiseFollowers', function (err) {
      if (!err) {
        resolve([channel, ~~minutes]);
      } else {
        reject(err);
      }
    });
  });
}

// Disable followers-only mode on a channel..
function followersonlyoff(channel) {
  var _this2 = this;

  channel = _.channel(channel);

  // Send the command to the server and race the Promise against a delay..
  return this._sendCommand(this._getPromiseDelay(), channel, '/followersoff', function (resolve, reject) {
    // Received _promiseFollowersoff event, resolve or reject..
    _this2.once('_promiseFollowersoff', function (err) {
      if (!err) {
        resolve([channel]);
      } else {
        reject(err);
      }
    });
  });
}

// Leave a channel..
function part(channel) {
  var _this3 = this;

  channel = _.channel(channel);

  // Send the command to the server and race the Promise against a delay..
  return this._sendCommand(this._getPromiseDelay(), null, 'PART ' + channel, function (resolve, reject) {
    // Received _promisePart event, resolve or reject..
    _this3.once('_promisePart', function (err) {
      if (!err) {
        resolve([channel]);
      } else {
        reject(err);
      }
    });
  });
}

// Enable R9KBeta mode on a channel..
function r9kbeta(channel) {
  var _this4 = this;

  channel = _.channel(channel);

  // Send the command to the server and race the Promise against a delay..
  return this._sendCommand(this._getPromiseDelay(), channel, '/r9kbeta', function (resolve, reject) {
    // Received _promiseR9kbeta event, resolve or reject..
    _this4.once('_promiseR9kbeta', function (err) {
      if (!err) {
        resolve([channel]);
      } else {
        reject(err);
      }
    });
  });
}

// Disable R9KBeta mode on a channel..
function r9kbetaoff(channel) {
  var _this5 = this;

  channel = _.channel(channel);

  // Send the command to the server and race the Promise against a delay..
  return this._sendCommand(this._getPromiseDelay(), channel, '/r9kbetaoff', function (resolve, reject) {
    // Received _promiseR9kbetaoff event, resolve or reject..
    _this5.once('_promiseR9kbetaoff', function (err) {
      if (!err) {
        resolve([channel]);
      } else {
        reject(err);
      }
    });
  });
}

// Enable slow mode on a channel..
function slow(channel, seconds) {
  var _this6 = this;

  channel = _.channel(channel);
  seconds = _.get(seconds, 300);

  // Send the command to the server and race the Promise against a delay..
  return this._sendCommand(this._getPromiseDelay(), channel, '/slow ' + seconds, function (resolve, reject) {
    // Received _promiseSlow event, resolve or reject..
    _this6.once('_promiseSlow', function (err) {
      if (!err) {
        resolve([channel, ~~seconds]);
      } else {
        reject(err);
      }
    });
  });
}

// Disable slow mode on a channel..
function slowoff(channel) {
  var _this7 = this;

  channel = _.channel(channel);

  // Send the command to the server and race the Promise against a delay..
  return this._sendCommand(this._getPromiseDelay(), channel, '/slowoff', function (resolve, reject) {
    // Received _promiseSlowoff event, resolve or reject..
    _this7.once('_promiseSlowoff', function (err) {
      if (!err) {
        resolve([channel]);
      } else {
        reject(err);
      }
    });
  });
}

module.exports = {
  // Send action message (/me <message>) on a channel..
  action: function action(channel, message) {
    channel = _.channel(channel);
    message = '\x01ACTION ' + message + '\x01';

    // Send the command to the server and race the Promise against a delay..
    return this._sendMessage(this._getPromiseDelay(), channel, message, function (resolve) {
      // At this time, there is no possible way to detect
      // if a message has been sent has been eaten
      // by the server, so we can only resolve the Promise.
      resolve([channel, message]);
    });
  },

  // Ban username on channel..
  ban: function ban(channel, username, reason) {
    var _this8 = this;

    channel = _.channel(channel);
    username = _.username(username);
    reason = _.get(reason, '');

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), channel, '/ban ' + username + ' ' + reason, function (resolve, reject) {
      // Received _promiseBan event, resolve or reject..
      _this8.once('_promiseBan', function (err) {
        if (!err) {
          resolve([channel, username, reason]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Clear all messages on a channel..
  clear: function clear(channel) {
    var _this9 = this;

    channel = _.channel(channel);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), channel, '/clear', function (resolve, reject) {
      // Received _promiseClear event, resolve or reject..
      _this9.once('_promiseClear', function (err) {
        if (!err) {
          resolve([channel]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Change the color of your username..
  color: function color(channel, newColor) {
    var _this10 = this;

    newColor = _.get(newColor, channel);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), '#tmijs', '/color ' + newColor, function (resolve, reject) {
      // Received _promiseColor event, resolve or reject..
      _this10.once('_promiseColor', function (err) {
        if (!err) {
          resolve([newColor]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Run commercial on a channel for X seconds..
  commercial: function commercial(channel, seconds) {
    var _this11 = this;

    channel = _.channel(channel);
    seconds = _.get(seconds, 30);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), channel, '/commercial ' + seconds, function (resolve, reject) {
      // Received _promiseCommercial event, resolve or reject..
      _this11.once('_promiseCommercial', function (err) {
        if (!err) {
          resolve([channel, ~~seconds]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Enable emote-only mode on a channel..
  emoteonly: function emoteonly(channel) {
    var _this12 = this;

    channel = _.channel(channel);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), channel, '/emoteonly', function (resolve, reject) {
      // Received _promiseEmoteonly event, resolve or reject..
      _this12.once('_promiseEmoteonly', function (err) {
        if (!err) {
          resolve([channel]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Disable emote-only mode on a channel..
  emoteonlyoff: function emoteonlyoff(channel) {
    var _this13 = this;

    channel = _.channel(channel);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), channel, '/emoteonlyoff', function (resolve, reject) {
      // Received _promiseEmoteonlyoff event, resolve or reject..
      _this13.once('_promiseEmoteonlyoff', function (err) {
        if (!err) {
          resolve([channel]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Enable followers-only mode on a channel..
  followersonly: followersonly,

  // Alias for followersonly()..
  followersmode: followersonly,

  // Disable followers-only mode on a channel..
  followersonlyoff: followersonlyoff,

  // Alias for followersonlyoff()..
  followersmodeoff: followersonlyoff,

  // Host a channel..
  host: function host(channel, target) {
    var _this14 = this;

    channel = _.channel(channel);
    target = _.username(target);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(2000, channel, '/host ' + target, function (resolve, reject) {
      // Received _promiseHost event, resolve or reject..
      _this14.once('_promiseHost', function (err, remaining) {
        if (!err) {
          resolve([channel, target, ~~remaining]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Join a channel..
  join: function join(channel) {
    var _this15 = this;

    channel = _.channel(channel);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), null, 'JOIN ' + channel, function (resolve, reject) {
      // Received _promiseJoin event, resolve or reject..
      _this15.once('_promiseJoin', function (err) {
        if (!err) {
          resolve([channel]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Mod username on channel..
  mod: function mod(channel, username) {
    var _this16 = this;

    channel = _.channel(channel);
    username = _.username(username);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), channel, '/mod ' + username, function (resolve, reject) {
      // Received _promiseMod event, resolve or reject..
      _this16.once('_promiseMod', function (err) {
        if (!err) {
          resolve([channel, username]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Get list of mods on a channel..
  mods: function mods(channel) {
    var _this17 = this;

    channel = _.channel(channel);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), channel, '/mods', function (resolve, reject) {
      // Received _promiseMods event, resolve or reject..
      _this17.once('_promiseMods', function (err, mods) {
        if (!err) {
          // Update the internal list of moderators..
          mods.forEach(function (username) {
            if (!_this17.moderators[channel]) {
              _this17.moderators[channel] = [];
            }
            if (_this17.moderators[channel].indexOf(username) < 0) {
              _this17.moderators[channel].push(username);
            }
          });
          resolve(mods);
        } else {
          reject(err);
        }
      });
    });
  },


  // Leave a channel..
  part: part,

  // Alias for part()..
  leave: part,

  // Send a ping to the server..
  ping: function ping() {
    var _this18 = this;

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), null, 'PING', function (resolve) {
      // Update the internal ping timeout check interval..
      _this18.latency = new Date();
      _this18.pingTimeout = setTimeout(function () {
        if (_this18.ws !== null) {
          _this18.wasCloseCalled = false;
          _this18.log.error('Ping timeout.');
          _this18.ws.close();

          clearInterval(_this18.pingLoop);
          clearTimeout(_this18.pingTimeout);
        }
      }, _.get(_this18.opts.connection.timeout, 9999));

      // Received _promisePing event, resolve or reject..
      _this18.once('_promisePing', function (latency) {
        resolve([parseFloat(latency)]);
      });
    });
  },

  // Enable R9KBeta mode on a channel..
  r9kbeta: r9kbeta,

  // Alias for r9kbeta()..
  r9kmode: r9kbeta,

  // Disable R9KBeta mode on a channel..
  r9kbetaoff: r9kbetaoff,

  // Alias for r9kbetaoff()..
  r9kmodeoff: r9kbetaoff,

  // Send a raw message to the server..
  raw: function raw(message) {
    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), null, message, function (resolve) {
      resolve([message]);
    });
  },

  // Send a message on a channel..
  say: function say(channel, message) {
    channel = _.channel(channel);

    if (message.startsWith('.') && !message.startsWith('..') || message.startsWith('/') || message.startsWith('\\')) {
      // Check if the message is an action message..
      if (message.substr(1, 3) === 'me ') {
        return this.action(channel, message.substr(4));
      }

      // Send the command to the server and race the Promise against a delay..
      return this._sendCommand(this._getPromiseDelay(), channel, message, function (resolve) {
        // At this time, there is no possible way to detect if a message has
        // been sent has been eaten by the server, so we can only resolve the
        // Promise.
        resolve([channel, message]);
      });
    }

    // Send the command to the server and race the Promise against a delay..
    return this._sendMessage(this._getPromiseDelay(), channel, message, function (resolve) {
      // At this time, there is no possible way to detect
      // if a message has been sent has been eaten
      // by the server, so we can only resolve the Promise.
      resolve([channel, message]);
    });
  },

  // Enable slow mode on a channel..
  slow: slow,

  // Alias for slow()..
  slowmode: slow,

  // Disable slow mode on a channel..
  slowoff: slowoff,

  // Alias for slowoff()..
  slowmodeoff: slowoff,

  // Enable subscribers mode on a channel..
  subscribers: function subscribers(channel) {
    var _this19 = this;

    channel = _.channel(channel);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), channel, '/subscribers', function (resolve, reject) {
      // Received _promiseSubscribers event, resolve or reject..
      _this19.once('_promiseSubscribers', function (err) {
        if (!err) {
          resolve([channel]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Disable subscribers mode on a channel..
  subscribersoff: function subscribersoff(channel) {
    var _this20 = this;

    channel = _.channel(channel);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), channel, '/subscribersoff', function (resolve, reject) {
      // Received _promiseSubscribersoff event, resolve or reject..
      _this20.once('_promiseSubscribersoff', function (err) {
        if (!err) {
          resolve([channel]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Timeout username on channel for X seconds..
  timeout: function timeout(channel, username, seconds, reason) {
    var _this21 = this;

    channel = _.channel(channel);
    username = _.username(username);

    if (!_.isNull(seconds) && !_.isInteger(seconds)) {
      reason = seconds;
      seconds = 300;
    }

    seconds = _.get(seconds, 300);
    reason = _.get(reason, '');

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), channel, '/timeout ' + username + ' ' + seconds + ' ' + reason, function (resolve, reject) {
      // Received _promiseTimeout event, resolve or reject..
      _this21.once('_promiseTimeout', function (err) {
        if (!err) {
          resolve([channel, username, ~~seconds, reason]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Unban username on channel..
  unban: function unban(channel, username) {
    var _this22 = this;

    channel = _.channel(channel);
    username = _.username(username);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), channel, '/unban ' + username, function (resolve, reject) {
      // Received _promiseUnban event, resolve or reject..
      _this22.once('_promiseUnban', function (err) {
        if (!err) {
          resolve([channel, username]);
        } else {
          reject(err);
        }
      });
    });
  },

  // End the current hosting..
  unhost: function unhost(channel) {
    var _this23 = this;

    channel = _.channel(channel);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(2000, channel, '/unhost', function (resolve, reject) {
      // Received _promiseUnhost event, resolve or reject..
      _this23.once('_promiseUnhost', function (err) {
        if (!err) {
          resolve([channel]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Unmod username on channel..
  unmod: function unmod(channel, username) {
    var _this24 = this;

    channel = _.channel(channel);
    username = _.username(username);

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), channel, '/unmod ' + username, function (resolve, reject) {
      // Received _promiseUnmod event, resolve or reject..
      _this24.once('_promiseUnmod', function (err) {
        if (!err) {
          resolve([channel, username]);
        } else {
          reject(err);
        }
      });
    });
  },

  // Send an whisper message to a user..
  whisper: function whisper(username, message) {
    var _this25 = this;

    username = _.username(username);

    // The server will not send a whisper to the account that sent it.
    if (username === this.getUsername()) {
      return Promise.reject('Cannot send a whisper to the same account.');
    }

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(this._getPromiseDelay(), '#tmijs', '/w ' + username + ' ' + message, function (resolve) {
      var from = _.channel(username);
      var userstate = _.merge({
        'message-type': 'whisper',
        'message-id': null,
        'thread-id': null,
        username: _this25.getUsername()
      }, _this25.globaluserstate);

      // Emit for both, whisper and message..
      _this25.emits(['whisper', 'message'], [[from, userstate, message, true], [from, userstate, message, true]]);

      // At this time, there is no possible way to detect
      // if a message has been sent has been eaten
      // by the server, so we can only resolve the Promise.
      resolve([username, message]);
    });
  }
};
//# sourceMappingURL=commands.js.map