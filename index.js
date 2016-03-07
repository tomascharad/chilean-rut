/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ChileanRut = function () {
	  function ChileanRut() {
	    _classCallCheck(this, ChileanRut);
	  }
	
	  _createClass(ChileanRut, [{
	    key: 'format',
	    value: function format(Rut, digitoVerificador) {
	      var sRut = Rut.toString();
	      var sRutFormateado = '';
	
	      sRut = this.unformat(sRut);
	      if (digitoVerificador) {
	        var sDV = sRut.charAt(sRut.length - 1);
	
	        sRut = sRut.substring(0, sRut.length - 1);
	      }
	      while (sRut.length > 3) {
	        sRutFormateado = '.' + sRut.substr(sRut.length - 3) + sRutFormateado;
	        sRut = sRut.substring(0, sRut.length - 3);
	      }
	      sRutFormateado = sRut + sRutFormateado;
	      if (sRutFormateado !== '' && digitoVerificador) {
	        sRutFormateado += '-' + sDV;
	      } else if (digitoVerificador) {
	        sRutFormateado += sDV;
	      }
	
	      return sRutFormateado;
	    }
	  }, {
	    key: 'unformat',
	    value: function unformat(rut) {
	      var strRut = rut.toString();
	
	      while (strRut.indexOf('.') !== -1) {
	        strRut = strRut.replace('.', '');
	      }
	      while (strRut.indexOf('-') !== -1) {
	        strRut = strRut.replace('-', '');
	      }
	
	      return strRut;
	    }
	  }, {
	    key: 'validValidatorDigit',
	    value: function validValidatorDigit(dv) {
	      if (dv !== '0' && dv !== '1' && dv !== '2' && dv !== '3' && dv !== '4' && dv !== '5' && dv !== '6' && dv !== '7' && dv !== '8' && dv !== '9' && dv !== 'k' && dv !== 'K') {
	        return false;
	      }
	      return true;
	    }
	  }, {
	    key: 'correctValidatorDigit',
	    value: function correctValidatorDigit(crut) {
	      var largo = crut.length;
	      var rut = null;
	      var dv = crut.charAt(largo - 1);
	
	      if (largo < 2) {
	        return false;
	      }
	      if (largo > 2) {
	        rut = crut.substring(0, largo - 1);
	      } else {
	        rut = crut.charAt(0);
	      }
	
	      this.validValidatorDigit(dv);
	
	      if (rut === null || dv === null) {
	        return 0;
	      }
	
	      var dvr = this.getValidatorDigit(rut);
	
	      if (dvr.toString() !== dv.toLowerCase()) {
	        return false;
	      }
	      return true;
	    }
	  }, {
	    key: 'getValidatorDigit',
	    value: function getValidatorDigit(rut) {
	      var dvr = '0';
	      var suma = 0;
	      var mul = 2;
	      var i = 0;
	      var res = 0;
	
	      for (i = rut.length - 1; i >= 0; i = i - 1) {
	        suma = suma + rut.charAt(i) * mul;
	        if (mul === 7) {
	          mul = 2;
	        } else {
	          mul = mul + 1;
	        }
	      }
	      res = suma % 11;
	      if (res === 1) {
	        return 'k';
	      } else if (res === 0) {
	        return '0';
	      } else {
	        return 11 - res;
	      }
	    }
	  }, {
	    key: 'validate',
	    value: function validate(_texto) {
	      var texto = this.unformat(_texto);
	      var largo = texto.length;
	      var i = 0;
	      var j = 0;
	      var invertido = '';
	      var dtexto = '';
	      var cnt = 0;
	
	      // rut muy corto
	      if (largo < 2) {
	        return false;
	      }
	
	      // verifica que los numeros correspondan a los de rut
	      for (i = 0; i < largo; i = i + 1) {
	        // numero o letra que no corresponda a los del rut
	        if (!this.validValidatorDigit(texto.charAt(i))) {
	          return false;
	        }
	      }
	
	      for (i = largo - 1, j = 0; i >= 0; i = i - 1, j = j + 1) {
	        invertido = invertido + texto.charAt(i);
	      }
	      dtexto = dtexto + invertido.charAt(0);
	      dtexto = dtexto + '-';
	
	      for (i = 1, j = 2; i < largo; i = i + 1, j = j + 1) {
	        if (cnt === 3) {
	          dtexto = dtexto + '.';
	          j = j + 1;
	          dtexto = dtexto + invertido.charAt(i);
	          cnt = 1;
	        } else {
	          dtexto = dtexto + invertido.charAt(i);
	          cnt = cnt + 1;
	        }
	      }
	
	      invertido = '';
	
	      for (i = dtexto.length - 1, j = 0; i >= 0; i = i - 1, j = j + 1) {
	        invertido = invertido + dtexto.charAt(i);
	      }
	
	      if (this.correctValidatorDigit(texto)) {
	        return true;
	      }
	      return false;
	    }
	  }]);
	
	  return ChileanRut;
	}();
	
	exports.default = ChileanRut;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDEzOTg3ZjJhMDFkNzk1YTA4ZjkiLCJ3ZWJwYWNrOi8vLy4vc291cmNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztLQ3RDTTtBQUNKLFlBREksVUFDSixHQUFjOzJCQURWLFlBQ1U7SUFBZDs7Z0JBREk7OzRCQUdHLEtBQUssbUJBQW1CO0FBQzdCLFdBQUksT0FBTyxJQUFJLFFBQUosRUFBUCxDQUR5QjtBQUU3QixXQUFJLGlCQUFpQixFQUFqQixDQUZ5Qjs7QUFJN0IsY0FBTyxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQVAsQ0FKNkI7QUFLN0IsV0FBSSxpQkFBSixFQUF1QjtBQUNyQixhQUFJLE1BQU0sS0FBSyxNQUFMLENBQVksS0FBSyxNQUFMLEdBQWMsQ0FBZCxDQUFsQixDQURpQjs7QUFHckIsZ0JBQU8sS0FBSyxTQUFMLENBQWUsQ0FBZixFQUFrQixLQUFLLE1BQUwsR0FBYyxDQUFkLENBQXpCLENBSHFCO1FBQXZCO0FBS0EsY0FBTyxLQUFLLE1BQUwsR0FBYyxDQUFkLEVBQWlCO0FBQ3RCLDBCQUFpQixNQUFNLEtBQUssTUFBTCxDQUFZLEtBQUssTUFBTCxHQUFjLENBQWQsQ0FBbEIsR0FBcUMsY0FBckMsQ0FESztBQUV0QixnQkFBTyxLQUFLLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLEtBQUssTUFBTCxHQUFjLENBQWQsQ0FBekIsQ0FGc0I7UUFBeEI7QUFJQSx3QkFBaUIsT0FBTyxjQUFQLENBZFk7QUFlN0IsV0FBSSxtQkFBbUIsRUFBbkIsSUFBeUIsaUJBQXpCLEVBQTRDO0FB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QkFBUyxTQUFTLFVBQVUsTUFBVixDQUFpQixDQUFqQixDQUFULENBREo7QUFFTCxpQkFBTSxNQUFNLENBQU4sQ0FGRDtVQUxQO1FBREY7O0FBWUEsbUJBQVksRUFBWixDQXhDZTs7QUEwQ2YsWUFBSyxJQUFJLE9BQU8sTUFBUCxHQUFnQixDQUFoQixFQUFtQixJQUFJLENBQUosRUFBTyxLQUFLLENBQUwsRUFBUSxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksSUFBSSxDQUFKLEVBQU87QUFDL0QscUJBQVksWUFBWSxPQUFPLE1BQVAsQ0FBYyxDQUFkLENBQVosQ0FEbUQ7UUFBakU7O0FBSUEsV0FBSSxLQUFLLHFCQUFMLENBQTJCLEtBQTNCLENBQUosRUFBdUM7QUFDckMsZ0JBQU8sSUFBUCxDQURxQztRQUF2QztBQUdBLGNBQU8sS0FBUCxDQWpEZTs7OztVQXBHYjs7O21CQXlKUyxXIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAwMTM5ODdmMmEwMWQ3OTVhMDhmOVxuICoqLyIsImNsYXNzIENoaWxlYW5SdXQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuICBmb3JtYXQoUnV0LCBkaWdpdG9WZXJpZmljYWRvcikge1xuICAgIHZhciBzUnV0ID0gUnV0LnRvU3RyaW5nKCk7XG4gICAgdmFyIHNSdXRGb3JtYXRlYWRvID0gJyc7XG5cbiAgICBzUnV0ID0gdGhpcy51bmZvcm1hdChzUnV0KTtcbiAgICBpZiAoZGlnaXRvVmVyaWZpY2Fkb3IpIHtcbiAgICAgIHZhciBzRFYgPSBzUnV0LmNoYXJBdChzUnV0Lmxlbmd0aCAtIDEpO1xuXG4gICAgICBzUnV0ID0gc1J1dC5zdWJzdHJpbmcoMCwgc1J1dC5sZW5ndGggLSAxKTtcbiAgICB9XG4gICAgd2hpbGUgKHNSdXQubGVuZ3RoID4gMykge1xuICAgICAgc1J1dEZvcm1hdGVhZG8gPSAnLicgKyBzUnV0LnN1YnN0cihzUnV0Lmxlbmd0aCAtIDMpICsgc1J1dEZvcm1hdGVhZG87XG4gICAgICBzUnV0ID0gc1J1dC5zdWJzdHJpbmcoMCwgc1J1dC5sZW5ndGggLSAzKTtcbiAgICB9XG4gICAgc1J1dEZvcm1hdGVhZG8gPSBzUnV0ICsgc1J1dEZvcm1hdGVhZG87XG4gICAgaWYgKHNSdXRGb3JtYXRlYWRvICE9PSAnJyAmJiBkaWdpdG9WZXJpZmljYWRvcikge1xuICAgICAgc1J1dEZvcm1hdGVhZG8gKz0gJy0nICsgc0RWO1xuICAgIH0gZWxzZSBpZiAoZGlnaXRvVmVyaWZpY2Fkb3IpIHtcbiAgICAgIHNSdXRGb3JtYXRlYWRvICs9IHNEVjtcbiAgICB9XG5cbiAgICByZXR1cm4gc1J1dEZvcm1hdGVhZG87XG4gIH1cblxuICB1bmZvcm1hdChydXQpIHtcbiAgICB2YXIgc3RyUnV0ID0gcnV0LnRvU3RyaW5nKCk7XG5cbiAgICB3aGlsZSAoc3RyUnV0LmluZGV4T2YoJy4nKSAhPT0gLSAxKSB7XG4gICAgICBzdHJSdXQgPSBzdHJSdXQucmVwbGFjZSgnLicsICcnKTtcbiAgICB9XG4gICAgd2hpbGUgKHN0clJ1dC5pbmRleE9mKCctJykgIT09IC0gMSkge1xuICAgICAgc3RyUnV0ID0gc3RyUnV0LnJlcGxhY2UoJy0nLCAnJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0clJ1dDtcbiAgfVxuXG4gIHZhbGlkVmFsaWRhdG9yRGlnaXQoZHYpIHtcbiAgICBpZiAoZHYgIT09ICcwJyAmJiBkdiAhPT0gJzEnICYmIGR2ICE9PSAnMicgJiYgZHYgIT09ICczJyAmJiBkdiAhPT0gJzQnICYmIGR2ICE9PSAnNScgJiYgZHYgIT09ICc2JyAmJiBkdiAhPT0gJzcnICYmIGR2ICE9PSAnOCcgJiYgZHYgIT09ICc5JyAmJiBkdiAhPT0gJ2snICYmIGR2ICE9PSAnSycpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjb3JyZWN0VmFsaWRhdG9yRGlnaXQoY3J1dCkge1xuICAgIHZhciBsYXJnbyA9IGNydXQubGVuZ3RoO1xuICAgIHZhciBydXQgPSBudWxsO1xuICAgIHZhciBkdiA9IGNydXQuY2hhckF0KGxhcmdvIC0gMSk7XG5cbiAgICBpZiAobGFyZ28gPCAyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChsYXJnbyA+IDIpIHtcbiAgICAgIHJ1dCA9IGNydXQuc3Vic3RyaW5nKDAsIGxhcmdvIC0gMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJ1dCA9IGNydXQuY2hhckF0KDApO1xuICAgIH1cblxuICAgIHRoaXMudmFsaWRWYWxpZGF0b3JEaWdpdChkdik7XG5cbiAgICBpZiAocnV0ID09PSBudWxsIHx8IGR2ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICB2YXIgZHZyID0gdGhpcy5nZXRWYWxpZGF0b3JEaWdpdChydXQpO1xuXG4gICAgaWYgKGR2ci50b1N0cmluZygpICE9PSBkdi50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0VmFsaWRhdG9yRGlnaXQocnV0KSB7XG4gICAgdmFyIGR2ciA9ICcwJztcbiAgICB2YXIgc3VtYSA9IDA7XG4gICAgdmFyIG11bCAgPSAyO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcmVzID0gMDtcblxuICAgIGZvciAoaSA9IHJ1dC5sZW5ndGggLSAxOyBpID49IDA7IGkgPSBpIC0gMSkge1xuICAgICAgc3VtYSA9IHN1bWEgKyBydXQuY2hhckF0KGkpICogbXVsO1xuICAgICAgaWYgKG11bCA9PT0gNykge1xuICAgICAgICBtdWwgPSAyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbXVsID0gbXVsICsgMTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzID0gc3VtYSAlIDExXG4gICAgaWYgKHJlcyA9PT0gMSkge1xuICAgICAgcmV0dXJuICdrJztcbiAgICB9IGVsc2UgaWYgKHJlcyA9PT0gMCkge1xuICAgICAgcmV0dXJuICcwJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDExIC0gcmVzO1xuICAgIH1cbiAgfVxuXG4gIHZhbGlkYXRlKF90ZXh0bykge1xuICAgIHZhciB0ZXh0byA9IHRoaXMudW5mb3JtYXQoX3RleHRvKTtcbiAgICB2YXIgbGFyZ28gPSB0ZXh0by5sZW5ndGg7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBqID0gMDtcbiAgICB2YXIgaW52ZXJ0aWRvID0gJyc7XG4gICAgdmFyIGR0ZXh0byA9ICcnO1xuICAgIHZhciBjbnQgPSAwO1xuXG4gICAgLy8gcnV0IG11eSBjb3J0b1xuICAgIGlmIChsYXJnbyA8IDIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyB2ZXJpZmljYSBxdWUgbG9zIG51bWVyb3MgY29ycmVzcG9uZGFuIGEgbG9zIGRlIHJ1dFxuICAgIGZvciAoaSA9IDA7IGkgPCBsYXJnbzsgaSA9IGkgKyAxKSB7XG4gICAgICAvLyBudW1lcm8gbyBsZXRyYSBxdWUgbm8gY29ycmVzcG9uZGEgYSBsb3MgZGVsIHJ1dFxuICAgICAgaWYgKCEgdGhpcy52YWxpZFZhbGlkYXRvckRpZ2l0KHRleHRvLmNoYXJBdChpKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoaSA9IGxhcmdvIC0gMSwgaiA9IDA7IGkgPj0gMDsgaSA9IGkgLSAxLCBqID0gaiArIDEpIHtcbiAgICAgIGludmVydGlkbyA9IGludmVydGlkbyArIHRleHRvLmNoYXJBdChpKTtcbiAgICB9XG4gICAgZHRleHRvID0gZHRleHRvICsgaW52ZXJ0aWRvLmNoYXJBdCgwKTtcbiAgICBkdGV4dG8gPSBkdGV4dG8gKyAnLSc7XG5cbiAgICBmb3IgKGkgPSAxLCBqID0gMjsgaSA8IGxhcmdvOyBpID0gaSArIDEsIGogPSBqICsgMSkge1xuICAgICAgaWYgKGNudCA9PT0gMykge1xuICAgICAgICBkdGV4dG8gPSBkdGV4dG8gKyAnLic7XG4gICAgICAgIGogPSBqICsgMTtcbiAgICAgICAgZHRleHRvID0gZHRleHRvICsgaW52ZXJ0aWRvLmNoYXJBdChpKTtcbiAgICAgICAgY250ID0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGR0ZXh0byA9IGR0ZXh0byArIGludmVydGlkby5jaGFyQXQoaSk7XG4gICAgICAgIGNudCA9IGNudCArIDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaW52ZXJ0aWRvID0gJyc7XG5cbiAgICBmb3IgKGkgPSBkdGV4dG8ubGVuZ3RoIC0gMSwgaiA9IDA7IGkgPj0gMDsgaSA9IGkgLSAxLCBqID0gaiArIDEpIHtcbiAgICAgIGludmVydGlkbyA9IGludmVydGlkbyArIGR0ZXh0by5jaGFyQXQoaSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29ycmVjdFZhbGlkYXRvckRpZ2l0KHRleHRvKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGlsZWFuUnV0O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2UuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9