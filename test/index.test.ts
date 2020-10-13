import { expect } from 'chai';
import { EventTarget, Event } from '../ts/index';

class EventTargetTest extends EventTarget {}

describe('Test of EventTarget', (): void => {
    it('Create an EventTarget', (): void => {
        expect(new EventTargetTest()).to.be.an.instanceof(EventTargetTest);
    });

    it('Add an listener and trigger it', (done): void => {
        const eventTargetTest = new EventTargetTest();
        eventTargetTest.addEventListener('test', (event): void => {
            expect(event.type).to.be.equal('test');
            done();
        });
        eventTargetTest.dispatchEvent(new Event('test'));
    });

    it('Add some listeners and trigger them', (done): void => {
        const eventTargetTest = new EventTargetTest();
        let count = 0;
        eventTargetTest.addEventListener('test', (): void => {
            count += 1;
        });
        eventTargetTest.addEventListener('test', (): void => {
            count += 1;
        });
        eventTargetTest.addEventListener('test', (event): void => {
            expect(event.type).to.be.equal('test');
            expect(count).to.be.equal(2);
            done();
        });
        eventTargetTest.dispatchEvent(new Event('test'));
    });

    it('Add symbol type listener', (done): void => {
        const eventTargetTest = new EventTargetTest();
        const type = Symbol();
        eventTargetTest.addEventListener(type, (event): void => {
            expect(event.type).to.be.equal(type);
            done();
        });
        eventTargetTest.dispatchEvent(new Event(type));
    });

    it('Remove listener by function', (done): void => {
        let count = 0;
        const eventTargetTest = new EventTargetTest();
        const fun1 = (): void => {
            count += 1;
        };
        const fun2 = (): void => {
            count += 1;
        };
        eventTargetTest.addEventListener('test', fun1);
        eventTargetTest.addEventListener('test', fun2);
        eventTargetTest.removeEventListener('test', fun2);
        eventTargetTest.dispatchEvent(new Event('test'));
        setTimeout((): void => {
            expect(count).to.be.equal(1);
            done();
        });
    });

    it('Remove listener by type', (done): void => {
        let count = 0;
        const eventTargetTest = new EventTargetTest();
        const fun = (): void => {
            count += 1;
        };
        eventTargetTest.addEventListener('test', fun);
        eventTargetTest.addEventListener('test', fun);
        eventTargetTest.removeEventListener('test');
        eventTargetTest.dispatchEvent(new Event('test'));
        setTimeout((): void => {
            expect(count).to.be.equal(0);
            done();
        });
    });

    it('Remove all listener', (done): void => {
        let count = 0;
        const eventTargetTest = new EventTargetTest();
        const fun = (): void => {
            count += 1;
        };
        eventTargetTest.addEventListener('test', fun);
        eventTargetTest.addEventListener('test', fun);
        eventTargetTest.removeAllEventListeners();
        eventTargetTest.dispatchEvent(new Event('test'));
        setTimeout((): void => {
            expect(count).to.be.equal(0);
            done();
        });
    });
});
