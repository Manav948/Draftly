const React = require('react');

function Picker(props) {
  // Minimal stub: render a container and call optional callbacks so app logic can continue
  const { onEmojiSelect } = props || {};
  const handleClick = () => {
    if (onEmojiSelect) onEmojiSelect({ native: '🙂' });
  };
  return React.createElement('div', { onClick: handleClick }, null);
}

module.exports = Picker;
module.exports.default = Picker;
