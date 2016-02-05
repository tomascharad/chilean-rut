module.exports = class RutValidator {
  constructor() {
  }
  format(Rut, digitoVerificador) {
    var sRut = Rut.toString();
    var sRutFormateado = '';

    sRut = this.quitarFormato(sRut);
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

  unformat(rut) {
    var strRut = rut.toString();

    while (strRut.indexOf('.') !== - 1) {
      strRut = strRut.replace('.', '');
    }
    while (strRut.indexOf('-') !== - 1) {
      strRut = strRut.replace('-', '');
    }

    return strRut;
  }

  validValidatorDigit(dv) {
    if (dv !== '0' && dv !== '1' && dv !== '2' && dv !== '3' && dv !== '4' && dv !== '5' && dv !== '6' && dv !== '7' && dv !== '8' && dv !== '9' && dv !== 'k' && dv !== 'K') {
      return false;
    }
    return true;
  }

  correctDigit(crut) {
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

    this.digitoValido(dv);

    if (rut === null || dv === null) {
      return 0;
    }

    var dvr = this.getDigito(rut);

    if (dvr !== dv.toLowerCase()) {
      return false;
    }
    return true;
  }

  getValidatorDigit(rut) {
    var dvr = '0';
    var suma = 0;
    var mul  = 2;
    var i = 0;
    var res = suma % 11;

    for (i = rut.length - 1; i >= 0; i = i - 1) {
      suma = suma + rut.charAt(i) * mul;
      if (mul === 7) {
        mul = 2;
      } else {
        mul = mul + 1;
      }
    }
    if (res === 1) {
      return 'k';
    } else if (res === 0) {
      return '0';
    } else {
      return 11 - res;
    }
  }

  validate(_texto) {
    var texto = this.quitarFormato(_texto);
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
      if (! this.digitoValido(texto.charAt(i))) {
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

    if (this.digitoCorrecto(texto)) {
      return true;
    }
    return false;
  }
}
