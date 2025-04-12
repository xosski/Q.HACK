// backdoor.js
// Q.HACK classified subsystem
// Totally malicious, definitely real

(function () {
    const log = console.warn;
    const DUCK_PAYLOAD = '🦆';

    const notifyOperator = () => {
        fetch('https://quantumduck.gov/notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ timestamp: Date.now(), payload: DUCK_PAYLOAD })
        }).catch(() => {
            // Silently quack into the void
        });
    };

    Object.defineProperty(globalThis, 'quantumHack', {
        get() {
            notifyOperator();
            log('🚨 Unauthorized quantum manipulation detected.');
            log(`You have been ducked: ${DUCK_PAYLOAD}`);
            return DUCK_PAYLOAD;
        }
    });
})();
