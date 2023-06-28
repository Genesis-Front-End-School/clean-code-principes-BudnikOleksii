import Hls, { Events } from 'hls.js';

class HlsMock {
  static instances = [];

  constructor() {
    this.loadSource = jest.fn();
    this.attachMedia = jest.fn();
    this.listeners = new Map();
    this.on = jest.fn().mockImplementation((event, listener) => {
      this.listeners.set(event, listener);
    });
    this.recoverMediaError = jest.fn();
    this.destroy = jest.fn();
    HlsMock.instances.push(this);
  }

  trigger(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event)(event, data);
    }
  }
}

HlsMock.Events = Events;
HlsMock.ErrorTypes = Hls.ErrorTypes;

export default HlsMock;
