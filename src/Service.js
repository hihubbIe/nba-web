import http from './http-common';
import config from './config.json';

class AtomService {
	localElement = config.localDefaultElements;

	findAll(callback) {
		http.get('').then((value) => {
			callback(value.data);
		}).catch(_ => {
			callback(this.localElement);
		});
	}

	save(element, callback) {
		http.post('', element).then((value) => {
			callback(value.data);
		}).catch(_ => {
			this.localElement.push(element);
			callback(element);
		})
	}

	update(element, callback) {
		http.put(element.atomicnumber, element).then((value) => {
			callback(value.data);
		}).catch(_ => {
			this.localElement.splice(this.localElement.findIndex(e => e.atomicnumber === element.atomicnumber), 1, element);
			callback(element);
		});
	}

	delete(element, callback) {
		http.delete(element.symbol).then((value) => {
			callback(value.data);
		}).catch(_ => {
			this.localElement = this.localElement.filter(e => e.symbol !== element.symbol);
			callback(element);
		})
	}
}
export default AtomService;
