module.exports = (app) => {
  app.get('/cont', (req, res) => {
    const data = require('./data/goods.json')
    res.send(data)
  })
}
