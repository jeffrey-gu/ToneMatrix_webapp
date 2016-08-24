function pentatonify() {
	var freqList = [];

	var baseFreq = 440.0;
	freqList[0] = baseFreq;

	for (var i = 1; i<5; i++) {
		freqList[i] = freqList[i-1] * 1.5;
	}

	for (var j = 1; j<5; j++) {
		while(freqList[j] < 440) {
			freqList[j] *= 2.0;
		}
		while(freqList[j] > 880) {
			freqList[j] /= 2.0;
		}
		// freqList[j] /= Math.pow(2, j);
	}

	freqList.sort();

	return freqList;
}

function Tone(context, freq, synthesizer) {
    this.attackTime = 0.0;
    this.releaseTime = 20;
    this.decay = 20;
    this.sustain = 1;
    this.context = context;

	this.osc = this.context.createOscillator();
	this.envelope = this.context.createGain();

	this.osc.connect(this.envelope);
	this.envelope.connect(synthesizer);

	this.osc.frequency.setValueAtTime(freq, 0);

	// function play() {
	// 	console.log("playing");
	// 	this.envelopeConfig();
	// 	this.osc.start(0);
	// }

	// function envelopeConfig() {
	// 	var now = this.context.currentTime;
	// 	var envAttackEnd = now + (this.attackTime / 10.0);

	// 	this.envelope.gain.setValueAtTime(0.0, now);
	// 	this.envelope.gain.linearRampToValueAtTime(1.0, envAttackEnd);
	// 	this.envelope.gain.setTargetAtTime((this.sustain / 100.0), envAttackEnd, (this.decay / 100.0) + 0.001);
	// }

	// function stop() {
	// 	var now = this.context.currentTime;
	// 	var release = now + (this.releaseTime/10.0);

	// 	this.envelope.gain.cancelScheduledValues(now);
	// 	this.envelope.gain.setValueAtTime(this.envelope.gain.value, now);
	// 	this.envelope.gain.setTargetAtTime(0.0, now, (this.releaseTime/100));

	// 	this.osc.stop(release);
	// }
}

Tone.prototype.play = function() {
	console.log("playing");
	this.envelopeConfig();
	this.osc.start(0);
}

Tone.prototype.envelopeConfig = function() {
	var now = this.context.currentTime;
	var envAttackEnd = now + (this.attackTime / 10.0);

	this.envelope.gain.setValueAtTime(0.0, now);
	this.envelope.gain.linearRampToValueAtTime(1.0, envAttackEnd);
	this.envelope.gain.setTargetAtTime((this.sustain / 100.0), envAttackEnd, (this.decay / 100.0) + 0.001);
}

Tone.prototype.stop = function() {
	var now = this.context.currentTime;
	var release = now + (this.releaseTime/10.0);

	this.envelope.gain.cancelScheduledValues(now);
	this.envelope.gain.setValueAtTime(this.envelope.gain.value, now);
	this.envelope.gain.setTargetAtTime(0.0, now, (this.releaseTime/100));

	this.osc.stop(release);
}
// var envelope = (function(context) {
//   var envelope = context.createGain();
//   this.envelopeConfig();

//   function envelopeConfig() {

//     this.attackTime = 0.0;
//     this.releaseTime = 20;
//     this.decay = 20;
//     this.sustain = 1;

//     var now = this.context.currentTime;
// 	var envAttackEnd = now + (this.attackTime / 10.0);
// 	this.envelope.gain.setValueAtTime(0.0, now);
// 	this.envelope.gain.linearRampToValueAtTime(1.0, envAttackEnd);
// 	this.envelope.gain.setTargetAtTime((this.sustain / 100.0), envAttackEnd, (this.decay / 100.0) + 0.001);
//   };

//   function stop() {

//   }

//   return envelope;
// })(context);


////////////////////////////////////
var AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext;	//older browsers need webkit prefix

if(AudioContext) {
	var ac = new AudioContext();

	var synthesizer = ac.createGain();
	synthesizer.gain.value = 0.25;

	var delay = ac.createDelay();
	delay.delayTime.value = 0.25;
	delay.connect(synthesizer);

	synthesizer.connect(delay);
	synthesizer.connect(ac.destination);


	//generate frequencies for notes
	var freqList = pentatonify();

	console.log(freqList);

	var noteList = [];
	var length = freqList.length;
	for (var i = 0; i < length; i++) {
		//construct a tone
		var note = new Tone(ac, freqList[i], synthesizer);
		noteList.push(note);
	}


	//rough idea:
	//create matrix of oscillator nodes
	//then if a tile is active, find corresponding osc node
	//connect osc node to effect nodes (for tone effect)
	//merge all tones into destination
	// var oscNode = ac.createOscillator();


	//TODO: define this after all inputs have been collected?
// 	var merger = ac.createChannelMerger(5);
// 	merger.connect(ac.destination);
// }
}
else {
	throw new Error('Web Audio not supported')
}


function playCol (updateList) {
	var length = updateList.length;
	for (var i = 0; i < length; i++) {
		var position = updateList[i].split(',');
		var row = Number(position[1]);
		console.log(noteList);
		console.log("trying to play row " + row);
		noteList[row].play();
	}
}
