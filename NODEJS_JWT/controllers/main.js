const login = async (req, res) => {
    res.send("Fake login/sign up/Register route");
  };
  
  const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello, Aadi, `,
      secret: `here is your lucky number ${luckyNumber}`,
    });
  };
  
  module.exports = { login, dashboard };
  