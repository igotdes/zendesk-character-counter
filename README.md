# Zendesk Character Counter

A configurable Tampermonkey script that adds a real-time character counter to Zendesk support responses. Customize character limits, colors, and choose which tickets trigger warnings based on subject keywords.

## Features

- 🔢 **Real-time counting**: Updates as you type
- ⚙️ **Configurable**: Customize limits, colors, and keywords
- 🎯 **Smart filtering**: Show warnings only when certain keywords are found in ticket subjects
- 🎨 **Color-coded warnings**: Visual feedback for character limits
- 📍 **Smart positioning**: Integrates seamlessly with Zendesk toolbar
- 🔄 **Auto-detection**: Works with modern Zendesk interface
- ⚡ **Lightweight**: Minimal performance impact

## Visual Indicators

**Default settings:**
- **Gray**: Normal count (0-300 characters)
- **Orange**: Approaching limit (301-350 characters) 
- **Dark Red**: Over limit (351+ characters)

**Note**: Colors only appear when ticket subjects contain your configured keywords (unless disabled).

## Configuration

All settings can be easily customized by editing the top section of the script:

### Character Limits
```javascript
const WARNING_THRESHOLD = 300;  // When to show warning color
const DANGER_THRESHOLD = 350;   // When to show danger color
```

### Colors
```javascript
const NORMAL_COLOR = '#666';    // Gray for normal count
const WARNING_COLOR = '#ff8800'; // Orange for approaching limit
const DANGER_COLOR = '#cc0000';  // Dark red for over limit
```

### Keyword Filtering
```javascript
// Show warnings only for tickets containing these keywords
const TRIGGER_KEYWORDS = [
    'social media',
    'twitter',
    'facebook',
    'instagram',
    'public response'
];

// To show warnings for ALL tickets, use:
const TRIGGER_KEYWORDS = [];
```

## Installation

### Prerequisites
- [Tampermonkey browser extension](https://www.tampermonkey.net/)

### Steps
1. **Install Tampermonkey** in your browser ([Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/), [Safari](https://apps.apple.com/us/app/tampermonkey/id1482490089), [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd))
2. **Click this link** to install the script: [zendesk-character-counter.user.js](https://github.com/igotdes/zendesk-character-counter/raw/refs/heads/main/zendesk-character-counter.user.js)
3. **Click "Install"** when Tampermonkey prompts you
4. **Navigate to Zendesk** and start typing in a ticket response

That's it! The character counter will automatically appear in the bottom-right of your composer toolbar.

## Compatibility

- ✅ **Modern Zendesk interface** (tested and confirmed)
- ❓ Classic Zendesk interface (untested - may work)
- ❓ Rich text editors (untested - may work)
- ❓ Plain text areas (untested - may work)
- ✅ All major browsers (Chrome, Firefox, Safari, Edge)

## Usage

The counter appears automatically in the lower-right corner of the text editor when you:
1. Click into a Zendesk ticket response field
2. Start typing your response
3. Navigate between different tickets

**Keyword Filtering**: By default, color warnings only appear for tickets whose subjects contain your configured keywords. This helps focus attention on responses where character limits matter most.

**All Tickets Mode**: Set `TRIGGER_KEYWORDS = []` to show warnings for every ticket.

## Character Limit Guidelines

The default script uses a 350-character warning threshold, which is commonly used for:
- Social media responses
- SMS/text message limits
- Brief, concise support responses
- Internal team guidelines

## Customization Examples

### Social Media Team Setup
```javascript
const WARNING_THRESHOLD = 200;
const DANGER_THRESHOLD = 280;
const TRIGGER_KEYWORDS = ['twitter', 'facebook', 'instagram', 'social media'];
```

### Customer Success Team
```javascript
const WARNING_THRESHOLD = 500;
const DANGER_THRESHOLD = 750;
const TRIGGER_KEYWORDS = ['escalation', 'complaint', 'urgent'];
```

### SMS Support Team
```javascript
const WARNING_THRESHOLD = 140;
const DANGER_THRESHOLD = 160;
const TRIGGER_KEYWORDS = []; // Show for all tickets
```

### Custom Color Scheme
```javascript
const NORMAL_COLOR = '#4a90e2';   // Blue
const WARNING_COLOR = '#f5a623';  // Amber
const DANGER_COLOR = '#d0021b';   // Bright red
```

## Troubleshooting

### Counter not appearing?
1. Make sure Tampermonkey is enabled
2. Check that the script is active in Tampermonkey dashboard
3. Refresh the Zendesk page
4. Try clicking in different text areas

### Counter showing wrong count?
1. Open browser console (F12)
2. Look for debug messages starting with "Raw text length"
3. [Create an issue](../../issues) with the console output

### Not working on your Zendesk instance?
Different Zendesk configurations might need adjustment. [Open an issue](../../issues) with your Zendesk URL format.

## Contributing

This project welcomes community contributions! The original author has limited availability for ongoing maintenance, so community involvement is especially appreciated.

### Ways to Contribute
- **Report bugs** by [creating an issue](../../issues)
- **Suggest features** or improvements
- **Submit pull requests** with fixes or enhancements
- **Fork the project** to create your own version

### Development
The script is well-commented and easy to modify. Key functions:
- `getTextContent()` - Extracts text from various input types
- `updateCounter()` - Updates display and colors
- `findToolbarContainer()` - Locates Zendesk toolbar for positioning

## Version History

- **v1.3** - Added smart positioning for Zendesk Messaging
- **v1.2** - Fixed space counting issue with multiple and leading/trailing spaces
- **v1.1** - Added keyword filtering for ticket subjects and user-friendly configuration section for limits, colors, and keywords
- **v1.0** - Initial public release with real-time character counting and basic color warnings

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

**Community Support**: This project relies on community support for ongoing maintenance and improvements.

If you encounter issues:
1. Check the [troubleshooting section](#troubleshooting)
2. [Search existing issues](../../issues) - someone may have already solved it
3. [Create a new issue](../../issues/new) for bugs or feature requests
4. Consider contributing a fix if you're able to solve it yourself

**Forking Encouraged**: Feel free to fork this project if you need custom modifications or want to maintain your own version.

---

**Made with ❤️ for support teams that use Zendesk**
