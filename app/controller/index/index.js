/**
 * Created by v_lljunli on 2017/8/14.
 */

router.get('/page/:number', function (req, res, next) {

  var categoriesData = Category.find();
  var documentCount = Document.count();
  var documentAllData = Document.find();
  var documentHotData = Document.find({document_hot: 1});

  Promise.all([categoriesData, documentCount, documentAllData, documentHotData]).then(function (result) {

    var categories = system.categoriesFormat(result[0]);

    res.render('index/' + theme + '/templates/index', {
      theme: theme,
      categories: categories,
      documentAll: result[2],
      documentHot: result[3],


    });
  });


});

