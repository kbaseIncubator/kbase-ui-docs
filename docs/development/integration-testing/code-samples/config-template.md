```json
{
    "envDefault": {
        "auth": {
            "username": "kbaseuitest",
            "realname": "KBase UI Test User"
        }
    },
    "envs": [
        {
            "env": "ci",
            "auth": {
                "token": "LOGIN_TOKEN_HERE"
            }
        },
        {
            "env": "next",
            "auth": {
                "token": "LOGIN_TOKEN_HERE"
            }
        },
        {
            "env": "prod",
            "hostPrefix": "narrative",
            "aliases": [
                {
                    "env": "narrative-dev"
                }
            ],
            "auth": {
                "token": "LOGIN_TOKEN_HERE"
            }
        }
    ]
}
```