# 🚀 Run Locally

#### 1) Bot setting:

Open [BotFather](https://t.me/BotFather) and create a test bot. Save bot token. To get access to Telegram mini app, you should set `Menu button` into your bot. Follow these steps:

Use the `/mybots` command => Select `@BotName` => Go to `Bot Settings` => Select `Menu Button` => `Create Menu Button`.

#### 3) Install Mongo:

Video how to install it locally [here](https://www.youtube.com/watch?v=pmjHPOPwX2A&ab_channel=шКодинг)

#### 2) Working with repo:

Clone the project:

```bash
  git clone https://link-to-project
```

Go to the project directory:

```bash
  cd my-project-name
```

Install dependencies:

```bash
  npm install
```

Create `.env` file in the root of the project:

```bash
  TELEGRAM_BOT_TOKEN="telegram bot token you've saved here"
  MONGO_URL="insert Mongo database URL here"
```

Start the server in dev mode:

```bash
  npm run start:dev
```

# API Endpoints

#### Find or Create user endpoint:

```http
  POST /users/find_or_create_user
```

#### Request body:

| Key    | Type     | Description                              |
| :----- | :------- | :--------------------------------------- |
| `_id`  | `number` | **Required**. Id from Telegram API       |
| `name` | `string` | **Required**. Username from Telegram API |

### Successfull response

#### A new User was created successfully OR an existing User was found.:

```json
{
  "message": "string",
  "user": {
    "image": "string",
    "name": "string",
    "teamId": "string" | "null",
    "userLevel": "number",
    "language": "ru" | "eng",
    "vibration": "boolean",
    "coinAnimation": "boolean",
    "referralsCount": "number"
  }
}
```

### Error response

```json
{
  "statusCode": "number",
  "message": "string"
}
```

# Other

💬 If you have any questions contact [Me](https://t.me/b1on1kkk) directly or write into backend topic.
