/**
 * MainController
 */

let MainController = {};


// home action
MainController.home = (req, res) => {
  res.send('Welcome to the homepage!');
};


export default MainController;
