// 代码生成时间: 2025-10-03 03:18:25
const EventEmitter = require('events');

// Define the Machine class
class Machine extends EventEmitter {
  
  // Machine states
  static STATES = {
    STOPPED: 'stopped',
    RUNNING: 'running',
    ERROR: 'error'
  };
  
  constructor(id, type) {
    super();
    this.id = id;
    this.type = type;
    this.state = Machine.STATES.STOPPED;
  }
  
  // Start the machine
  start() {
    if (this.state === Machine.STATES.RUNNING) {
      console.error(`Machine ${this.id} is already running`);
      return;
    }
    this.state = Machine.STATES.RUNNING;
    console.log(`Machine ${this.id} started`);
    // Emit an event when the machine starts
    this.emit('start', { id: this.id });
  }
  
  // Stop the machine
  stop() {
    if (this.state !== Machine.STATES.RUNNING) {
      console.error(`Machine ${this.id} is not running`);
      return;
    }
    this.state = Machine.STATES.STOPPED;
    console.log(`Machine ${this.id} stopped`);
    // Emit an event when the machine stops
    this.emit('stop', { id: this.id });
  }
  
  // Report an error with the machine
  error(message) {
    if (this.state !== Machine.STATES.ERROR) {
      this.state = Machine.STATES.ERROR;
      console.error(`Machine ${this.id} error: ${message}`);
      // Emit an error event
      this.emit('error', { id: this.id, message: message });
    }
  }
}

// Define the AutomationSystem class
class AutomationSystem {
  
  constructor() {
    this.machines = {};
  }
  
  // Add a machine to the system
  addMachine(id, type) {
    if (this.machines[id]) {
      throw new Error(`Machine with ID ${id} already exists`);
    }
    this.machines[id] = new Machine(id, type);
  }
  
  // Remove a machine from the system
  removeMachine(id) {
    if (!this.machines[id]) {
      throw new Error(`Machine with ID ${id} does not exist`);
    }
    delete this.machines[id];
  }
  
  // Start all machines in the system
  startAllMachines() {
    Object.values(this.machines).forEach(machine => machine.start());
  }
  
  // Stop all machines in the system
  stopAllMachines() {
    Object.values(this.machines).forEach(machine => machine.stop());
  }
  
  // Monitor the state of a machine
  onMachineEvent(machineId, eventType, callback) {
    if (!this.machines[machineId]) {
      throw new Error(`Machine with ID ${machineId} does not exist`);
    }
    this.machines[machineId].on(eventType, callback);
  }
}

// Example usage
const system = new AutomationSystem();

// Add machines to the system
system.addMachine('001', 'conveyor');
system.addMachine('002', 'robotic_arm');

// Start all machines
system.startAllMachines();

// Monitor machine events
system.onMachineEvent('001', 'start', (data) => {
  console.log(`Machine ${data.id} started`);
});
system.onMachineEvent('002', 'error', (data) => {
  console.error(`Machine ${data.id} error: ${data.message}`);
});

// Stop all machines
setTimeout(() => {
  system.stopAllMachines();
}, 5000); // Stop machines after 5 seconds
