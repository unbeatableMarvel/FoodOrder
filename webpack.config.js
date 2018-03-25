
var config = {
   entry: './index.js',
	
   output: {
      path:'',
      filename: 'bundle.min.js',
   },
	
   devServer: {
      inline: true,
      port: 8080
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
				
            query: {
               presets: ['es2015', 'react','stage-0']
            }


         }
      ]
   }
}

module.exports = config;