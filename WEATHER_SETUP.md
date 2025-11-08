# Weather Dashboard Setup Guide

## Overview
The Weather Dashboard provides real-time weather information from around the world using the OpenWeatherMap API. This guide will help you get started.

## Features
- 🌍 **Search by City**: Get weather data for any city worldwide
- 📊 **Current Weather**: Temperature, humidity, wind speed, visibility, and pressure
- 📅 **5-Day Forecast**: Extended weather predictions
- ⭐ **Favorite Cities**: Save your frequently checked locations
- 🌓 **Dark/Light Mode**: Toggle between themes
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Weather Icons**: Visual representation of weather conditions

## Setup Instructions

### 1. Get Your OpenWeatherMap API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to your account dashboard
4. Generate an API key (the free tier includes 1,000 API calls/day)

### 2. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and add your API key:
   ```env
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

   **Important**: Replace `your_actual_api_key_here` with your real API key from OpenWeatherMap.

### 3. Start the Development Server

```bash
npm run dev
```

### 4. Access the Weather Dashboard

Open your browser and navigate to:
```
http://localhost:3000/weather
```

## Using the Weather Dashboard

### Searching for Weather
1. Enter a city name in the search box
2. Click "Search" or press Enter
3. View current weather and 5-day forecast

### Managing Favorites
1. After searching for a city, click the ⭐ icon to add it to favorites
2. Your favorites appear below the search bar
3. Click any favorite city to quickly load its weather
4. Click the star again to remove from favorites

### Theme Toggle
- Click the "☀️ Light Mode" button to switch to light theme
- Click the "🌙 Dark Mode" button to switch back to dark theme
- Your preference is maintained during your session

## API Usage

### Current Weather Endpoint
```
https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric
```

### 5-Day Forecast Endpoint
```
https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric
```

### Rate Limits (Free Tier)
- 1,000 API calls per day
- 60 calls per minute

## Error Handling

The dashboard handles various error scenarios:
- **City not found**: Displays an error message prompting to check spelling
- **API rate limit**: Shows an error if too many requests are made
- **Network errors**: Handles connection failures gracefully
- **Invalid API key**: Notifies if the API key is incorrect

## Troubleshooting

### Issue: "Failed to fetch" error
**Solution**: 
1. Check that your API key is correctly set in `.env.local`
2. Ensure the API key is active (new keys may take a few minutes)
3. Verify you haven't exceeded the rate limit

### Issue: City not found
**Solution**: 
1. Check the spelling of the city name
2. Try using the full city name (e.g., "New York" instead of "NY")
3. For cities with common names, try adding the country (e.g., "Paris, FR")

### Issue: API key not working
**Solution**:
1. Make sure you've created the `.env.local` file in the root directory
2. Restart the development server after adding the API key
3. Verify the environment variable name is exactly `NEXT_PUBLIC_OPENWEATHER_API_KEY`

## Data Storage

### LocalStorage
Favorite cities are stored in your browser's localStorage:
- Key: `weatherFavorites`
- Format: JSON array of city names
- Data persists between sessions
- Clearing browser data will remove favorites

## Privacy & Data Usage

- No personal information is collected
- City searches are sent to OpenWeatherMap API
- Favorite cities are stored locally in your browser only
- No server-side data storage

## Additional Resources

- [OpenWeatherMap API Documentation](https://openweathermap.org/api)
- [Weather Icons Reference](https://openweathermap.org/weather-conditions)
- [API Error Codes](https://openweathermap.org/faq#error401)

## Support

If you encounter issues:
1. Check this guide for common solutions
2. Verify your API key is valid and active
3. Check the browser console for error messages
4. Review the OpenWeatherMap API status page

## License & Attribution

This weather dashboard uses the OpenWeatherMap API. Please ensure you comply with their terms of service and attribution requirements when deploying to production.
