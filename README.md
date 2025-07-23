# Zendesk Character Counter

A minimalist Tampermonkey script that adds a real-time character counter to Zendesk support responses. Perfect for keeping track of response length and staying within character limits.

## Features

- 🔢 **Real-time counting**: Updates as you type
- 🎨 **Color-coded warnings**: Visual feedback for character limits
- 📍 **Smart positioning**: Integrates seamlessly with Zendesk toolbar
- 🔄 **Auto-detection**: Works with both classic and modern Zendesk interfaces
- ⚡ **Lightweight**: Minimal performance impact

## Visual Indicators

- **Gray**: Normal count (0-300 characters)
- **Orange**: Approaching limit (301-350 characters) 
- **Dark Red**: Over limit (351+ characters)

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

The counter appears automatically when you:
1. Click into a Zendesk ticket response field
2. Start typing your response
3. Navigate between different tickets

No configuration needed - it just works!

## Character Limit Guidelines

The default script uses a 350-character warning threshold, which is commonly used for:
- Social media responses
- SMS/text message limits
- Brief, concise support responses
- Internal team guidelines

You can modify these limits by editing the script (see [Customization](#customization) below).

## Customization

### Changing Character Limits
Edit these lines in the script to adjust warning thresholds:
```javascript
if (charCount > 350) {        // Over limit threshold
if (charCount > 300) {        // Warning threshold
```

### Changing Colors
Modify the color values:
```javascript
counter.style.color = '#cc0000'; // Dark red for over limit
counter.style.color = '#ff8800'; // Orange for warning
counter.style.color = '#666';    // Gray for normal
```

### Changing Position
Adjust the positioning in the CSS:
```javascript
right: 10px;  // Distance from right edge
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
- **Become a maintainer** - reach out if you're interested in helping maintain this project

### For Maintainers
If you're interested in becoming a regular contributor or maintainer:
1. Start by submitting a few quality pull requests
2. Comment on issues to help other users
3. Reach out via issues or discussions about taking on maintainer responsibilities

The project is designed to be community-driven and welcomes new maintainers who want to keep it updated and improved.

### Development
The script is well-commented and easy to modify. Key functions:
- `getTextContent()` - Extracts text from various input types
- `updateCounter()` - Updates display and colors
- `findToolbarContainer()` - Locates Zendesk toolbar for positioning

## Version History

- **v1.0** - Initial public release with real-time character counting, color-coded warnings, and smart positioning

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

**Community Support**: This project relies on community support. While the original author may not be able to provide immediate responses, the community is encouraged to help each other.

If you encounter issues:
1. Check the [troubleshooting section](#troubleshooting)
2. [Search existing issues](../../issues) - someone may have already solved it
3. [Create a new issue](../../issues/new) for bugs or feature requests
4. Consider contributing a fix if you're able to solve it yourself

**Forking Encouraged**: Feel free to fork this project if you need custom modifications or want to maintain your own version.

---

**Made with ❤️ for support teams using Zendesk**
