const responsivePrimaryButtonStyle = isMobile => ({
  borderRadius: '20px',
  margin: '1px',
  backgroundColor: '#132832',
  color: 'white',
  fontSize: isMobile ? '12px' : '16px',
});

const responsiveSecondButtonStyle = isMobile => ({
  borderRadius: '20px',
  margin: '1px',
  color: '#132832',
  fontSize: isMobile ? '12px' : '16px',
});

module.exports = {
  responsivePrimaryButtonStyle,
  responsiveSecondButtonStyle,
};
