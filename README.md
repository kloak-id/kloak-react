# @kloak.id/react

The official React SDK for Kloak.id. 

This package provides a context provider, authentication hooks, and beautifully styled drop-in UI components for building secure web applications.

## Installation

```bash
npm install @kloak.id/react @kloak.id/web
```

## 1. Setup the Provider

Wrap your application in the `<KloakProvider>` to initialize the SDK and provide the authentication context to your React tree.

```tsx
import React from 'react';
import { KloakProvider } from '@kloak.id/react';

export default function App({ children }) {
  return (
    <KloakProvider 
      config={{
        baseUrl: 'https://auth.yourdomain.com',
        tenantId: 'default'
      }}
    >
      {children}
    </KloakProvider>
  );
}
```

## 2. Drop-in UI Components

Kloak provides pre-built, fully styled forms for common authentication flows.

### Authentication Screen (Sign In / Sign Up)

```tsx
import { KloakAuth } from '@kloak.id/react';

export default function LoginPage() {
  return (
    <div style={{ padding: 40, maxWidth: 400, margin: '0 auto' }}>
      <KloakAuth 
        onSignInSuccess={() => window.location.href = '/dashboard'}
      />
    </div>
  );
}
```

### Email Verification Callback

When a user clicks the verification link in their email, they should land on a dedicated route in your app (e.g., `/verify-email`). Drop in the `EmailVerificationForm` component to automatically handle the URL token parsing and API verification.

```tsx
import { EmailVerificationForm } from '@kloak.id/react';

export default function VerifyEmailPage() {
  return (
    <EmailVerificationForm 
      onSuccess={() => {
        console.log("Email verified!");
        window.location.href = '/dashboard';
      }}
    />
  );
}
```

## 3. React Hooks

Access the current user's session anywhere in your app using the provided hooks.

```tsx
import { useUser, useKloak } from '@kloak.id/react';

export default function UserProfile() {
  const user = useUser();
  const kloak = useKloak();

  if (!user) {
    return <p>Please log in.</p>;
  }

  return (
    <div>
      <h1>Welcome back, {user.email}!</h1>
      <button onClick={() => kloak.signOut()}>
        Log Out
      </button>
    </div>
  );
}
```

## License
Apache 2.0
