# Fix GitHub OAuth Redirect URI Error

## 🔴 Problem
Error: "The redirect_uri is not associated with this application"

This happens when the redirect URI in your GitHub OAuth app doesn't match what Supabase is sending.

---

## ✅ Solution: Configure GitHub OAuth Correctly

### Step 1: Get Your Supabase Callback URL

**For Local Development:**
```
http://localhost:54321/auth/v1/callback
```

**For Remote/Production:**
```
https://laivxtjatppivybvawjz.supabase.co/auth/v1/callback
```

---

### Step 2: Configure GitHub OAuth App

1. **Go to GitHub Developer Settings:**
   - https://github.com/settings/developers
   - Click on your OAuth App (or create a new one)

2. **Add Authorization Callback URL:**
   - In the "Authorization callback URL" field, add:
     - **For Local:** `http://localhost:54321/auth/v1/callback`
     - **For Production:** `https://laivxtjatppivybvawjz.supabase.co/auth/v1/callback`
   - You can add BOTH if you want to test locally and in production

3. **Save the changes**

---

### Step 3: Configure Supabase Dashboard

1. **Go to Supabase Dashboard:**
   - https://app.supabase.com/project/laivxtjatppivybvawjz/auth/providers
   - Find "GitHub" provider and click to configure

2. **Add GitHub Credentials:**
   - **Client ID:** From your GitHub OAuth app
   - **Client Secret:** From your GitHub OAuth app

3. **Set Redirect URL in Supabase:**
   - Go to: https://app.supabase.com/project/laivxtjatppivybvawjz/auth/url-configuration
   - Under "Redirect URLs", add:
     - **For Local:** `http://localhost:8080/auth/callback`
     - **For Production:** `https://yourdomain.com/auth/callback`

---

## 📋 Complete Configuration Checklist

### GitHub OAuth App Settings:
- [ ] Authorization callback URL: `http://localhost:54321/auth/v1/callback` (local)
- [ ] Authorization callback URL: `https://laivxtjatppivybvawjz.supabase.co/auth/v1/callback` (production)
- [ ] Client ID copied
- [ ] Client Secret copied

### Supabase Dashboard Settings:
- [ ] GitHub provider enabled
- [ ] Client ID added
- [ ] Client Secret added
- [ ] Redirect URL added: `http://localhost:8080/auth/callback` (local)
- [ ] Redirect URL added: `https://yourdomain.com/auth/callback` (production)

---

## 🔍 How It Works

1. User clicks "Sign in with GitHub" in your app
2. App redirects to Supabase: `https://laivxtjatppivybvawjz.supabase.co/auth/v1/authorize?provider=github&redirect_to=...`
3. Supabase redirects to GitHub: `https://github.com/login/oauth/authorize?...&redirect_uri=https://laivxtjatppivybvawjz.supabase.co/auth/v1/callback`
4. GitHub redirects back to Supabase: `https://laivxtjatppivybvawjz.supabase.co/auth/v1/callback?code=...`
5. Supabase processes the callback and redirects to your app: `http://localhost:8080/auth/callback?code=...`
6. Your app handles the callback and completes authentication

---

## ⚠️ Important Notes

1. **GitHub redirect URI** must be the **Supabase callback URL** (not your app URL)
2. **Supabase redirect URL** must be your **app callback URL** (`/auth/callback`)
3. URLs must match **exactly** (including `http://` vs `https://`, trailing slashes, etc.)
4. For local development, make sure Supabase is running: `pnpm supabase:start`

---

## 🧪 Testing

1. Make sure Supabase is running (if local):
   ```bash
   cd apps/supabase-server
   pnpm supabase:start
   ```

2. Start your web app:
   ```bash
   cd apps/web
   pnpm dev
   ```

3. Click "Sign in with GitHub" in your app
4. You should be redirected to GitHub, then back to your app

---

## 🐛 Still Not Working?

### Check These:

1. **GitHub OAuth App:**
   - Is the callback URL exactly: `https://laivxtjatppivybvawjz.supabase.co/auth/v1/callback`?
   - No trailing slash?
   - Using `https://` not `http://` for production?

2. **Supabase Dashboard:**
   - Is GitHub provider enabled?
   - Are Client ID and Secret correct?
   - Is redirect URL set: `http://localhost:8080/auth/callback`?

3. **Browser Console:**
   - Check for any error messages
   - Check Network tab for failed requests

4. **Supabase Logs:**
   - Check Supabase Dashboard > Logs > Auth
   - Look for any error messages

---

## 📝 Quick Reference

| Setting | Location | Value |
|---------|----------|-------|
| GitHub Callback URL | GitHub OAuth App | `https://laivxtjatppivybvawjz.supabase.co/auth/v1/callback` |
| Supabase Redirect URL | Supabase Dashboard | `http://localhost:8080/auth/callback` |
| App Callback Route | Your App | `/auth/callback` |

---

**After making these changes, try signing in with GitHub again!**
