# OAuth Setup Guide - GitHub & Google

## 🔴 GitHub OAuth Error Fix

**Error:** "The redirect_uri is not associated with this application"

---

## ✅ Quick Fix for GitHub OAuth

### Step 1: Update GitHub OAuth App

1. Go to: https://github.com/settings/developers
2. Click on your OAuth App
3. In **"Authorization callback URL"**, add:
   ```
   https://laivxtjatppivybvawjz.supabase.co/auth/v1/callback
   ```
4. **Save changes**

> ⚠️ **Important:** This is the Supabase callback URL, NOT your app URL!

---

### Step 2: Verify Supabase Configuration

1. Go to: https://app.supabase.com/project/laivxtjatppivybvawjz/auth/providers
2. Click on **GitHub** provider
3. Make sure:
   - ✅ Provider is **Enabled**
   - ✅ **Client ID** is filled (from GitHub)
   - ✅ **Client Secret** is filled (from GitHub)

4. Go to: https://app.supabase.com/project/laivxtjatppivybvawjz/auth/url-configuration
5. Under **"Redirect URLs"**, add:
   ```
   http://localhost:8080/auth/callback
   ```
   (Add your production URL too if needed)

---

## 🔄 How OAuth Flow Works

```
Your App → Supabase → GitHub → Supabase → Your App
```

1. User clicks "Sign in with GitHub"
2. Redirects to: `https://laivxtjatppivybvawjz.supabase.co/auth/v1/authorize?provider=github`
3. Supabase redirects to GitHub with callback: `https://laivxtjatppivybvawjz.supabase.co/auth/v1/callback`
4. GitHub redirects back to Supabase: `https://laivxtjatppivybvawjz.supabase.co/auth/v1/callback?code=...`
5. Supabase processes and redirects to your app: `http://localhost:8080/auth/callback`

---

## 📋 Configuration Checklist

### GitHub OAuth App:
- [ ] Callback URL: `https://laivxtjatppivybvawjz.supabase.co/auth/v1/callback`
- [ ] Client ID copied
- [ ] Client Secret copied

### Supabase Dashboard:
- [ ] GitHub provider enabled
- [ ] Client ID added
- [ ] Client Secret added
- [ ] Redirect URL: `http://localhost:8080/auth/callback`

---

## ✅ Google OAuth Setup (Same Process)

### Step 1: Google Cloud Console

1. Go to: https://console.cloud.google.com/
2. Create OAuth 2.0 Client ID
3. Add **Authorized redirect URIs**:
   ```
   https://laivxtjatppivybvawjz.supabase.co/auth/v1/callback
   ```

### Step 2: Supabase Dashboard

1. Go to: https://app.supabase.com/project/laivxtjatppivybvawjz/auth/providers
2. Click on **Google** provider
3. Add:
   - Client ID (from Google)
   - Client Secret (from Google)

---

## 🧪 Test After Configuration

1. Make sure your app is running:
   ```bash
   cd apps/web
   pnpm dev
   ```

2. Click "Sign in with GitHub" or "Sign in with Google"

3. You should be redirected to the provider, then back to your app

---

## 🐛 Troubleshooting

### Still getting redirect_uri error?

1. **Check GitHub OAuth App:**
   - Callback URL must be EXACTLY: `https://laivxtjatppivybvawjz.supabase.co/auth/v1/callback`
   - No trailing slash
   - Must use `https://` (not `http://`)

2. **Check Supabase:**
   - Is GitHub provider enabled?
   - Are credentials correct?
   - Is redirect URL set in URL configuration?

3. **Clear browser cache** and try again

4. **Check browser console** for any errors

---

## 📝 URLs Reference

| What | Where | URL |
|------|-------|-----|
| GitHub Callback | GitHub OAuth App | `https://laivxtjatppivybvawjz.supabase.co/auth/v1/callback` |
| App Redirect | Supabase Dashboard | `http://localhost:8080/auth/callback` |
| App Route | Your App Code | `/auth/callback` |

---

**After updating GitHub OAuth app, wait a few seconds for changes to propagate, then try again!**
