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
	
	exports.default = new ChileanRut();

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzhmYWI3NWFmMWQzNDU2NTkxM2EiLCJ3ZWJwYWNrOi8vLy4vc291cmNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztLQ3RDTTtBQUNKLFlBREksVUFDSixHQUFjOzJCQURWLFlBQ1U7SUFBZDs7Z0JBREk7OzRCQUdHLEtBQUssbUJBQW1CO0FBQzdCLFdBQUksT0FBTyxJQUFJLFFBQUosRUFBUCxDQUR5QjtBQUU3QixXQUFJLGlCQUFpQixFQUFqQixDQUZ5Qjs7QUFJN0IsY0FBTyxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQVAsQ0FKNkI7QUFLN0IsV0FBSSxpQkFBSixFQUF1QjtBQUNyQixhQUFJLE1BQU0sS0FBSyxNQUFMLENBQVksS0FBSyxNQUFMLEdBQWMsQ0FBZCxDQUFsQixDQURpQjs7QUFHckIsZ0JBQU8sS0FBSyxTQUFMLENBQWUsQ0FBZixFQUFrQixLQUFLLE1BQUwsR0FBYyxDQUFkLENBQXpCLENBSHFCO1FBQXZCO0FBS0EsY0FBTyxLQUFLLE1BQUwsR0FBYyxDQUFkLEVBQWlCO0FBQ3RCLDBCQUFpQixNQUFNLEtBQUssTUFBTCxDQUFZLEtBQUssTUFBTCxHQUFjLENBQWQsQ0FBbEIsR0FBcUMsY0FBckMsQ0FESztBQUV0QixnQkFBTyxLQUFLLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLEtBQUssTUFBTCxHQUFjLENBQWQsQ0FBekIsQ0FGc0I7UUFBeEI7QUFJQSx3QkFBaUIsT0FBTyxjQUFQLENBZFk7QUFlN0IsV0FBSSxtQkFBbUIsRUFBbkIsSUFBeUIsaUJBQXpCLEVBQTRDO0FB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QkFBUyxTQUFTLFVBQVUsTUFBVixDQUFpQixDQUFqQixDQUFULENBREo7QUFFTCxpQkFBTSxNQUFNLENBQU4sQ0FGRDtVQUxQO1FBREY7O0FBWUEsbUJBQVksRUFBWixDQXhDZTs7QUEwQ2YsWUFBSyxJQUFJLE9BQU8sTUFBUCxHQUFnQixDQUFoQixFQUFtQixJQUFJLENBQUosRUFBTyxLQUFLLENBQUwsRUFBUSxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksSUFBSSxDQUFKLEVBQU87QUFDL0QscUJBQVksWUFBWSxPQUFPLE1BQVAsQ0FBYyxDQUFkLENBQVosQ0FEbUQ7UUFBakU7O0FBSUEsV0FBSSxLQUFLLHFCQUFMLENBQTJCLEtBQTNCLENBQUosRUFBdUM7QUFDckMsZ0JBQU8sSUFBUCxDQURxQztRQUF2QztBQUdBLGNBQU8sS0FBUCxDQWpEZTs7OztVQXBHYjs7O21CQXlKUyxJQUFJLFVBQUosRyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNzhmYWI3NWFmMWQzNDU2NTkxM2FcbiAqKi8iLCJjbGFzcyBDaGlsZWFuUnV0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cbiAgZm9ybWF0KFJ1dCwgZGlnaXRvVmVyaWZpY2Fkb3IpIHtcbiAgICB2YXIgc1J1dCA9IFJ1dC50b1N0cmluZygpO1xuICAgIHZhciBzUnV0Rm9ybWF0ZWFkbyA9ICcnO1xuXG4gICAgc1J1dCA9IHRoaXMudW5mb3JtYXQoc1J1dCk7XG4gICAgaWYgKGRpZ2l0b1ZlcmlmaWNhZG9yKSB7XG4gICAgICB2YXIgc0RWID0gc1J1dC5jaGFyQXQoc1J1dC5sZW5ndGggLSAxKTtcblxuICAgICAgc1J1dCA9IHNSdXQuc3Vic3RyaW5nKDAsIHNSdXQubGVuZ3RoIC0gMSk7XG4gICAgfVxuICAgIHdoaWxlIChzUnV0Lmxlbmd0aCA+IDMpIHtcbiAgICAgIHNSdXRGb3JtYXRlYWRvID0gJy4nICsgc1J1dC5zdWJzdHIoc1J1dC5sZW5ndGggLSAzKSArIHNSdXRGb3JtYXRlYWRvO1xuICAgICAgc1J1dCA9IHNSdXQuc3Vic3RyaW5nKDAsIHNSdXQubGVuZ3RoIC0gMyk7XG4gICAgfVxuICAgIHNSdXRGb3JtYXRlYWRvID0gc1J1dCArIHNSdXRGb3JtYXRlYWRvO1xuICAgIGlmIChzUnV0Rm9ybWF0ZWFkbyAhPT0gJycgJiYgZGlnaXRvVmVyaWZpY2Fkb3IpIHtcbiAgICAgIHNSdXRGb3JtYXRlYWRvICs9ICctJyArIHNEVjtcbiAgICB9IGVsc2UgaWYgKGRpZ2l0b1ZlcmlmaWNhZG9yKSB7XG4gICAgICBzUnV0Rm9ybWF0ZWFkbyArPSBzRFY7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNSdXRGb3JtYXRlYWRvO1xuICB9XG5cbiAgdW5mb3JtYXQocnV0KSB7XG4gICAgdmFyIHN0clJ1dCA9IHJ1dC50b1N0cmluZygpO1xuXG4gICAgd2hpbGUgKHN0clJ1dC5pbmRleE9mKCcuJykgIT09IC0gMSkge1xuICAgICAgc3RyUnV0ID0gc3RyUnV0LnJlcGxhY2UoJy4nLCAnJyk7XG4gICAgfVxuICAgIHdoaWxlIChzdHJSdXQuaW5kZXhPZignLScpICE9PSAtIDEpIHtcbiAgICAgIHN0clJ1dCA9IHN0clJ1dC5yZXBsYWNlKCctJywgJycpO1xuICAgIH1cblxuICAgIHJldHVybiBzdHJSdXQ7XG4gIH1cblxuICB2YWxpZFZhbGlkYXRvckRpZ2l0KGR2KSB7XG4gICAgaWYgKGR2ICE9PSAnMCcgJiYgZHYgIT09ICcxJyAmJiBkdiAhPT0gJzInICYmIGR2ICE9PSAnMycgJiYgZHYgIT09ICc0JyAmJiBkdiAhPT0gJzUnICYmIGR2ICE9PSAnNicgJiYgZHYgIT09ICc3JyAmJiBkdiAhPT0gJzgnICYmIGR2ICE9PSAnOScgJiYgZHYgIT09ICdrJyAmJiBkdiAhPT0gJ0snKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY29ycmVjdFZhbGlkYXRvckRpZ2l0KGNydXQpIHtcbiAgICB2YXIgbGFyZ28gPSBjcnV0Lmxlbmd0aDtcbiAgICB2YXIgcnV0ID0gbnVsbDtcbiAgICB2YXIgZHYgPSBjcnV0LmNoYXJBdChsYXJnbyAtIDEpO1xuXG4gICAgaWYgKGxhcmdvIDwgMikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAobGFyZ28gPiAyKSB7XG4gICAgICBydXQgPSBjcnV0LnN1YnN0cmluZygwLCBsYXJnbyAtIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBydXQgPSBjcnV0LmNoYXJBdCgwKTtcbiAgICB9XG5cbiAgICB0aGlzLnZhbGlkVmFsaWRhdG9yRGlnaXQoZHYpO1xuXG4gICAgaWYgKHJ1dCA9PT0gbnVsbCB8fCBkdiA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgdmFyIGR2ciA9IHRoaXMuZ2V0VmFsaWRhdG9yRGlnaXQocnV0KTtcblxuICAgIGlmIChkdnIudG9TdHJpbmcoKSAhPT0gZHYudG9Mb3dlckNhc2UoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldFZhbGlkYXRvckRpZ2l0KHJ1dCkge1xuICAgIHZhciBkdnIgPSAnMCc7XG4gICAgdmFyIHN1bWEgPSAwO1xuICAgIHZhciBtdWwgID0gMjtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIHJlcyA9IDA7XG5cbiAgICBmb3IgKGkgPSBydXQubGVuZ3RoIC0gMTsgaSA+PSAwOyBpID0gaSAtIDEpIHtcbiAgICAgIHN1bWEgPSBzdW1hICsgcnV0LmNoYXJBdChpKSAqIG11bDtcbiAgICAgIGlmIChtdWwgPT09IDcpIHtcbiAgICAgICAgbXVsID0gMjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG11bCA9IG11bCArIDE7XG4gICAgICB9XG4gICAgfVxuICAgIHJlcyA9IHN1bWEgJSAxMVxuICAgIGlmIChyZXMgPT09IDEpIHtcbiAgICAgIHJldHVybiAnayc7XG4gICAgfSBlbHNlIGlmIChyZXMgPT09IDApIHtcbiAgICAgIHJldHVybiAnMCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAxMSAtIHJlcztcbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZShfdGV4dG8pIHtcbiAgICB2YXIgdGV4dG8gPSB0aGlzLnVuZm9ybWF0KF90ZXh0byk7XG4gICAgdmFyIGxhcmdvID0gdGV4dG8ubGVuZ3RoO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGludmVydGlkbyA9ICcnO1xuICAgIHZhciBkdGV4dG8gPSAnJztcbiAgICB2YXIgY250ID0gMDtcblxuICAgIC8vIHJ1dCBtdXkgY29ydG9cbiAgICBpZiAobGFyZ28gPCAyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gdmVyaWZpY2EgcXVlIGxvcyBudW1lcm9zIGNvcnJlc3BvbmRhbiBhIGxvcyBkZSBydXRcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGFyZ287IGkgPSBpICsgMSkge1xuICAgICAgLy8gbnVtZXJvIG8gbGV0cmEgcXVlIG5vIGNvcnJlc3BvbmRhIGEgbG9zIGRlbCBydXRcbiAgICAgIGlmICghIHRoaXMudmFsaWRWYWxpZGF0b3JEaWdpdCh0ZXh0by5jaGFyQXQoaSkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGkgPSBsYXJnbyAtIDEsIGogPSAwOyBpID49IDA7IGkgPSBpIC0gMSwgaiA9IGogKyAxKSB7XG4gICAgICBpbnZlcnRpZG8gPSBpbnZlcnRpZG8gKyB0ZXh0by5jaGFyQXQoaSk7XG4gICAgfVxuICAgIGR0ZXh0byA9IGR0ZXh0byArIGludmVydGlkby5jaGFyQXQoMCk7XG4gICAgZHRleHRvID0gZHRleHRvICsgJy0nO1xuXG4gICAgZm9yIChpID0gMSwgaiA9IDI7IGkgPCBsYXJnbzsgaSA9IGkgKyAxLCBqID0gaiArIDEpIHtcbiAgICAgIGlmIChjbnQgPT09IDMpIHtcbiAgICAgICAgZHRleHRvID0gZHRleHRvICsgJy4nO1xuICAgICAgICBqID0gaiArIDE7XG4gICAgICAgIGR0ZXh0byA9IGR0ZXh0byArIGludmVydGlkby5jaGFyQXQoaSk7XG4gICAgICAgIGNudCA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkdGV4dG8gPSBkdGV4dG8gKyBpbnZlcnRpZG8uY2hhckF0KGkpO1xuICAgICAgICBjbnQgPSBjbnQgKyAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIGludmVydGlkbyA9ICcnO1xuXG4gICAgZm9yIChpID0gZHRleHRvLmxlbmd0aCAtIDEsIGogPSAwOyBpID49IDA7IGkgPSBpIC0gMSwgaiA9IGogKyAxKSB7XG4gICAgICBpbnZlcnRpZG8gPSBpbnZlcnRpZG8gKyBkdGV4dG8uY2hhckF0KGkpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvcnJlY3RWYWxpZGF0b3JEaWdpdCh0ZXh0bykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IENoaWxlYW5SdXQoKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==