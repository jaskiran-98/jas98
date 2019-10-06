module.exports.profile= function(req, res)
{
   // return res.end('<h1>Express is up for Codeial!</h1>');
    return res.render('home', 
    {
        title: "Profile"
    });
};