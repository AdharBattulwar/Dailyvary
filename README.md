# Location/Address Flow Application

A comprehensive location and address management system built with React, TypeScript, and Supabase, featuring Google Maps integration.

## Features

- 📍 Google Maps integration for visual location selection
- 🔍 Address search with Google Places Autocomplete
- 📱 Responsive design for all devices
- 📍 Current location detection
- ✏️ Address form with validation
- 💾 Save multiple addresses
- ⭐ Set default address
- 🗑️ Delete addresses
- 🔒 Secure authentication with Supabase
- 🎨 Clean and modern UI with Tailwind CSS

## Prerequisites

Before running the application, make sure you have:

1. Node.js installed (v14 or higher)
2. A Google Maps API key with the following APIs enabled:
   - Maps JavaScript API
   - Places API
   - Geocoding API
3. A Supabase project set up

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/
│   ├── AddressForm/
│   ├── AddressList/
│   ├── LocationSearch/
│   └── Map/
├── pages/
│   └── AddressManager.tsx
├── types/
│   └── address.ts
├── lib/
│   └── supabase.ts
└── App.tsx
```

## Database Schema

The application uses a Supabase database with the following schema:

```sql
Table: addresses
- id: uuid (primary key)
- user_id: uuid (references auth.users)
- street: text
- city: text
- state: text
- postal_code: text
- country: text
- latitude: double precision
- longitude: double precision
- is_default: boolean
- label: text (optional)
- created_at: timestamptz
- updated_at: timestamptz
```

## Security

- Row Level Security (RLS) is enabled on the addresses table
- Users can only access their own addresses
- Authentication is handled by Supabase

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

MIT