import json
import urllib.request
import time

url = 'http://127.0.0.1:8000/api/usuarios/registro/'
email = f"testuser_{int(time.time())}@example.com"
data = {
    'username': email,
    'nombre': 'Test Usuario',
    'email': email,
    'password': 'Testpass123',
    'rol': 'solicitante'
}

req = urllib.request.Request(
    url,
    data=json.dumps(data).encode('utf-8'),
    headers={'Content-Type': 'application/json'}
)

try:
    with urllib.request.urlopen(req, timeout=10) as r:
        print('STATUS', r.status)
        print(r.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print('HTTP ERROR', e.code)
    print(e.read().decode('utf-8'))
except Exception as e:
    print('ERROR', e)
