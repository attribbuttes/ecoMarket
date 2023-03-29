async (req, res) => {
    try {
      const customer = await Customers.update({
        full_name: req.body.full_name,
        username: req.body.username,
        role: req.body.role,
        sex: req.body.sex,
        email: req.file.email,
        text: req.body.text
      }, {
        where: {
          id: req.params.id
        }
      });
      
      res.redirect('/profile/');
    } catch (error) {
      console.log(error);
      res.render('userEdit', { error, customers });
    }
  }
  