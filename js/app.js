(function () {
  "use strict";

  var config = window.CARD_CONFIG;

  if (!config) {
    document.body.classList.add("config-error");
    return;
  }

  var qrDialog = document.getElementById("qr-dialog");
  var qrClose = document.getElementById("qr-close");
  var statusMessage = document.getElementById("status-message");

  renderCard(config);
  bindDialog();

  function renderCard(cardConfig) {
    setDocumentMeta(cardConfig);
    renderPlaceholderNotice(cardConfig);
    renderBrand(cardConfig);
    renderRepresentative(cardConfig);
    renderCompany(cardConfig);
    renderServices(cardConfig.company.services);
    renderDetails(cardConfig);
    renderActions(cardConfig);
  }

  function setDocumentMeta(cardConfig) {
    document.title = cardConfig.company.name + " | Digital Business Card";

    var description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", cardConfig.company.description);
    }
  }

  function renderPlaceholderNotice(cardConfig) {
    var notice = document.getElementById("placeholder-notice");

    if (!notice || !cardConfig.isPlaceholder) {
      return;
    }

    notice.textContent = cardConfig.placeholderNotice;
    notice.hidden = false;
  }

  function renderBrand(cardConfig) {
    setImage("company-logo", cardConfig.company.logo);
    setText("company-tagline", cardConfig.company.tagline);
    setText("company-name-small", cardConfig.company.name);
  }

  function renderRepresentative(cardConfig) {
    setImage("representative-photo", cardConfig.representative.photo);
    setText("representative-name", cardConfig.representative.fullName);
    setText("representative-title", cardConfig.representative.title);
  }

  function renderCompany(cardConfig) {
    setText("company-name", cardConfig.company.name);
    setText("company-description", cardConfig.company.description);

    var serviceAreaSection = document.getElementById("service-area-section");
    if (hasText(cardConfig.company.serviceArea)) {
      setText("service-area", cardConfig.company.serviceArea);
      serviceAreaSection.hidden = false;
    }
  }

  function renderServices(services) {
    var section = document.getElementById("services-section");
    var list = document.getElementById("services-list");

    if (!section || !list || !Array.isArray(services) || services.length === 0) {
      return;
    }

    services.filter(hasText).forEach(function (service) {
      var item = document.createElement("li");
      item.textContent = service;
      list.appendChild(item);
    });

    section.hidden = list.children.length === 0;
  }

  function renderDetails(cardConfig) {
    var details = document.getElementById("business-details");
    var address = getAddressDisplay(cardConfig.company.address);
    var items = [
      ["Phone", cardConfig.company.phoneDisplay],
      ["Email", cardConfig.company.email],
      ["Website", cardConfig.company.websiteUrl],
      ["Address", address]
    ];

    items.forEach(function (item) {
      if (!hasText(item[1])) {
        return;
      }

      var row = document.createElement("div");
      var term = document.createElement("dt");
      var description = document.createElement("dd");

      term.textContent = item[0];
      description.textContent = item[1];
      row.append(term, description);
      details.appendChild(row);
    });
  }

  function renderActions(cardConfig) {
    var grid = document.getElementById("action-grid");
    var mapHref = getMapHref(cardConfig.company.address);
    var cardUrl = getCardUrl(cardConfig);
    var actions = [
      {
        kind: "link",
        label: "Call",
        detail: cardConfig.company.phoneDisplay,
        href: hasText(cardConfig.company.phoneHref)
          ? "tel:" + cardConfig.company.phoneHref
          : ""
      },
      {
        kind: "link",
        label: "Text",
        detail: cardConfig.company.phoneDisplay,
        href: hasText(cardConfig.company.smsHref)
          ? "sms:" + cardConfig.company.smsHref
          : ""
      },
      {
        kind: "link",
        label: "Email",
        detail: cardConfig.company.email,
        href: hasText(cardConfig.company.email)
          ? "mailto:" + cardConfig.company.email
          : ""
      },
      {
        kind: "link",
        label: "Visit Website",
        detail: cardConfig.company.websiteUrl,
        href: normalizeExternalUrl(cardConfig.company.websiteUrl),
        external: true
      },
      {
        kind: "link",
        label: "Open Map",
        detail: getAddressDisplay(cardConfig.company.address),
        href: normalizeExternalUrl(mapHref),
        external: true
      },
      {
        kind: "button",
        label: "Save Contact",
        detail: "Download vCard",
        action: function () {
          downloadVCard(cardConfig);
        }
      },
      {
        kind: "button",
        label: "Share Card",
        detail: "Send public link",
        action: function () {
          shareCard(cardConfig);
        }
      },
      {
        kind: "button",
        label: "Copy Link",
        detail: cardUrl,
        action: function () {
          copyCardLink(cardUrl);
        }
      },
      {
        kind: "button",
        label: "Show QR Code",
        detail: cardConfig.card.qrLabel,
        action: function () {
          showQrCode(cardConfig);
        }
      }
    ];

    actions.forEach(function (action) {
      if (!hasText(action.href) && action.kind === "link") {
        return;
      }

      grid.appendChild(createActionControl(action));
    });
  }

  function createActionControl(action) {
    var control =
      action.kind === "link"
        ? document.createElement("a")
        : document.createElement("button");
    var label = document.createElement("span");
    var detail = document.createElement("span");

    control.className = "action-control";
    label.className = "action-label";
    detail.className = "action-detail";
    label.textContent = action.label;
    detail.textContent = action.detail || "";

    if (action.kind === "link") {
      control.href = action.href;
      control.setAttribute(
        "aria-label",
        action.detail ? action.label + ": " + action.detail : action.label
      );

      if (action.external) {
        control.rel = "noopener";
      }
    } else {
      control.type = "button";
      control.addEventListener("click", action.action);
    }

    control.append(label, detail);
    return control;
  }

  function downloadVCard(cardConfig) {
    var vCard = buildVCard(cardConfig);
    var blob = new Blob([vCard], { type: "text/vcard;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");

    link.href = url;
    link.download = cardConfig.vCard.fileName || "contact.vcf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setStatus("Contact file ready to save.");
  }

  function buildVCard(cardConfig) {
    var company = cardConfig.company;
    var representative = cardConfig.representative;
    var address = company.address || {};
    var lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:" +
        escapeVCard(representative.lastName) +
        ";" +
        escapeVCard(representative.firstName) +
        ";;;",
      "FN:" + escapeVCard(representative.fullName),
      "ORG:" + escapeVCard(cardConfig.vCard.organization || company.name),
      "TITLE:" + escapeVCard(representative.title)
    ];

    addVCardLine(lines, "TEL;TYPE=WORK,VOICE", company.phoneHref);
    addVCardLine(lines, "EMAIL;TYPE=WORK", company.email);
    addVCardLine(lines, "URL", company.websiteUrl);

    if (hasText(getAddressDisplay(address))) {
      lines.push(
        "ADR;TYPE=WORK:;;" +
          [
            address.street,
            address.locality,
            address.region,
            address.postalCode,
            address.country
          ]
            .map(escapeVCard)
            .join(";")
      );
    }

    addVCardLine(lines, "NOTE", cardConfig.vCard.note);
    lines.push("END:VCARD");

    return lines.map(foldVCardLine).join("\r\n") + "\r\n";
  }

  function addVCardLine(lines, field, value) {
    if (hasText(value)) {
      lines.push(field + ":" + escapeVCard(value));
    }
  }

  function escapeVCard(value) {
    return String(value || "")
      .replace(/\\/g, "\\\\")
      .replace(/\r?\n/g, "\\n")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,");
  }

  function foldVCardLine(line) {
    var result = "";
    var remaining = line;

    while (remaining.length > 73) {
      result += remaining.slice(0, 73) + "\r\n ";
      remaining = remaining.slice(73);
    }

    return result + remaining;
  }

  function shareCard(cardConfig) {
    var url = getCardUrl(cardConfig);
    var shareData = {
      title:
        cardConfig.card.shareTitle ||
        cardConfig.company.name + " Digital Business Card",
      text: cardConfig.card.shareText,
      url: url
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(function () {
          setStatus("Card share sheet opened.");
        })
        .catch(function () {
          copyCardLink(url);
        });
      return;
    }

    copyCardLink(url);
  }

  function copyCardLink(url) {
    copyText(url)
      .then(function () {
        setStatus("Card link copied.");
      })
      .catch(function () {
        setStatus("Copy was not available in this browser.");
      });
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      var textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();

      try {
        if (document.execCommand("copy")) {
          resolve();
        } else {
          reject(new Error("Copy command was unavailable."));
        }
      } catch (error) {
        reject(error);
      } finally {
        textarea.remove();
      }
    });
  }

  function showQrCode(cardConfig) {
    var target = getCardUrl(cardConfig);
    var output = document.getElementById("qr-output");
    var urlText = document.getElementById("qr-url");

    output.replaceChildren(createQrSvg(target));
    urlText.textContent = target;

    if (qrDialog && typeof qrDialog.showModal === "function") {
      qrDialog.showModal();
      qrClose.focus();
    } else if (qrDialog) {
      qrDialog.setAttribute("open", "");
      qrClose.focus();
    }
  }

  function createQrSvg(text) {
    var matrix = createQrMatrix(text);
    var quietZone = 4;
    var moduleCount = matrix.length;
    var size = moduleCount + quietZone * 2;
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var background = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    var pathData = [];

    svg.setAttribute("viewBox", "0 0 " + size + " " + size);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "QR code for the public card link");
    svg.setAttribute("shape-rendering", "crispEdges");

    background.setAttribute("width", String(size));
    background.setAttribute("height", String(size));
    background.setAttribute("fill", "#ffffff");

    matrix.forEach(function (row, y) {
      row.forEach(function (isDark, x) {
        if (isDark) {
          pathData.push(
            "M" + (x + quietZone) + " " + (y + quietZone) + "h1v1h-1z"
          );
        }
      });
    });

    path.setAttribute("d", pathData.join(""));
    path.setAttribute("fill", "#111827");
    svg.append(background, path);
    return svg;
  }

  function createQrMatrix(text) {
    var version = 5;
    var size = version * 4 + 17;
    var dataCodewordCount = 108;
    var errorCodewordCount = 26;
    var bytes = Array.from(new TextEncoder().encode(text));

    if (bytes.length > 106) {
      throw new Error("QR target is too long for the built-in encoder.");
    }

    var dataCodewords = makeDataCodewords(bytes, dataCodewordCount);
    var errorCodewords = reedSolomonRemainder(
      dataCodewords,
      reedSolomonDivisor(errorCodewordCount)
    );
    var allCodewords = dataCodewords.concat(errorCodewords);
    var matrix = makeEmptyMatrix(size);
    var reserved = makeEmptyMatrix(size);
    var mask = 0;

    drawFunctionPatterns(matrix, reserved);
    drawCodewords(matrix, reserved, codewordsToBits(allCodewords), mask);
    drawFormatBits(matrix, reserved, mask);

    return matrix;
  }

  function makeDataCodewords(bytes, dataCodewordCount) {
    var bits = [0, 1, 0, 0];
    var padBytes = [0xec, 0x11];

    appendBits(bits, bytes.length, 8);
    bytes.forEach(function (byte) {
      appendBits(bits, byte, 8);
    });

    appendBits(bits, 0, Math.min(4, dataCodewordCount * 8 - bits.length));

    while (bits.length % 8 !== 0) {
      bits.push(0);
    }

    var codewords = bitsToCodewords(bits);
    var padIndex = 0;

    while (codewords.length < dataCodewordCount) {
      codewords.push(padBytes[padIndex % 2]);
      padIndex += 1;
    }

    return codewords;
  }

  function appendBits(bits, value, length) {
    for (var i = length - 1; i >= 0; i -= 1) {
      bits.push((value >>> i) & 1);
    }
  }

  function bitsToCodewords(bits) {
    var codewords = [];

    for (var i = 0; i < bits.length; i += 8) {
      var value = 0;

      for (var j = 0; j < 8; j += 1) {
        value = (value << 1) | (bits[i + j] || 0);
      }

      codewords.push(value);
    }

    return codewords;
  }

  function codewordsToBits(codewords) {
    var bits = [];

    codewords.forEach(function (codeword) {
      appendBits(bits, codeword, 8);
    });

    return bits;
  }

  function drawFunctionPatterns(matrix, reserved) {
    var size = matrix.length;

    drawFinder(matrix, reserved, 0, 0);
    drawFinder(matrix, reserved, size - 7, 0);
    drawFinder(matrix, reserved, 0, size - 7);
    drawAlignment(matrix, reserved, 30, 30);
    drawTiming(matrix, reserved);
    drawDarkModule(matrix, reserved);
    reserveFormatAreas(reserved);
  }

  function drawFinder(matrix, reserved, left, top) {
    for (var y = -1; y <= 7; y += 1) {
      for (var x = -1; x <= 7; x += 1) {
        var xx = left + x;
        var yy = top + y;

        if (!inBounds(matrix, xx, yy)) {
          continue;
        }

        var isFinder =
          x >= 0 &&
          x <= 6 &&
          y >= 0 &&
          y <= 6 &&
          (x === 0 ||
            x === 6 ||
            y === 0 ||
            y === 6 ||
            (x >= 2 && x <= 4 && y >= 2 && y <= 4));

        matrix[yy][xx] = isFinder;
        reserved[yy][xx] = true;
      }
    }
  }

  function drawAlignment(matrix, reserved, centerX, centerY) {
    for (var y = -2; y <= 2; y += 1) {
      for (var x = -2; x <= 2; x += 1) {
        var xx = centerX + x;
        var yy = centerY + y;
        var isDark =
          Math.max(Math.abs(x), Math.abs(y)) === 2 || (x === 0 && y === 0);

        matrix[yy][xx] = isDark;
        reserved[yy][xx] = true;
      }
    }
  }

  function drawTiming(matrix, reserved) {
    var size = matrix.length;

    for (var i = 8; i < size - 8; i += 1) {
      var isDark = i % 2 === 0;

      if (!reserved[6][i]) {
        matrix[6][i] = isDark;
        reserved[6][i] = true;
      }

      if (!reserved[i][6]) {
        matrix[i][6] = isDark;
        reserved[i][6] = true;
      }
    }
  }

  function drawDarkModule(matrix, reserved) {
    var size = matrix.length;
    matrix[size - 8][8] = true;
    reserved[size - 8][8] = true;
  }

  function reserveFormatAreas(reserved) {
    var size = reserved.length;
    var coords = [];

    for (var i = 0; i <= 5; i += 1) {
      coords.push([8, i]);
    }

    coords.push([8, 7], [8, 8], [7, 8]);

    for (i = 9; i < 15; i += 1) {
      coords.push([14 - i, 8]);
    }

    for (i = 0; i < 8; i += 1) {
      coords.push([size - 1 - i, 8]);
    }

    for (i = 8; i < 15; i += 1) {
      coords.push([8, size - 15 + i]);
    }

    coords.forEach(function (coord) {
      reserved[coord[1]][coord[0]] = true;
    });
  }

  function drawCodewords(matrix, reserved, bits, mask) {
    var size = matrix.length;
    var bitIndex = 0;
    var upward = true;

    for (var right = size - 1; right >= 1; right -= 2) {
      if (right === 6) {
        right -= 1;
      }

      for (var vert = 0; vert < size; vert += 1) {
        var y = upward ? size - 1 - vert : vert;

        for (var offset = 0; offset < 2; offset += 1) {
          var x = right - offset;

          if (reserved[y][x]) {
            continue;
          }

          var bit = bitIndex < bits.length ? bits[bitIndex] === 1 : false;
          var masked = bit !== getMask(mask, x, y);
          matrix[y][x] = masked;
          bitIndex += 1;
        }
      }

      upward = !upward;
    }
  }

  function drawFormatBits(matrix, reserved, mask) {
    var size = matrix.length;
    var bits = getFormatBits(mask);

    for (var i = 0; i <= 5; i += 1) {
      setReserved(matrix, reserved, 8, i, getBit(bits, i));
    }

    setReserved(matrix, reserved, 8, 7, getBit(bits, 6));
    setReserved(matrix, reserved, 8, 8, getBit(bits, 7));
    setReserved(matrix, reserved, 7, 8, getBit(bits, 8));

    for (i = 9; i < 15; i += 1) {
      setReserved(matrix, reserved, 14 - i, 8, getBit(bits, i));
    }

    for (i = 0; i < 8; i += 1) {
      setReserved(matrix, reserved, size - 1 - i, 8, getBit(bits, i));
    }

    for (i = 8; i < 15; i += 1) {
      setReserved(matrix, reserved, 8, size - 15 + i, getBit(bits, i));
    }

    setReserved(matrix, reserved, 8, size - 8, true);
  }

  function getFormatBits(mask) {
    var data = (1 << 3) | mask;
    var remainder = data;

    for (var i = 0; i < 10; i += 1) {
      remainder =
        (remainder << 1) ^ (((remainder >>> 9) & 1) ? 0x537 : 0);
    }

    return ((data << 10) | remainder) ^ 0x5412;
  }

  function reedSolomonDivisor(degree) {
    var result = new Array(degree).fill(0);
    var root = 1;

    result[degree - 1] = 1;

    for (var i = 0; i < degree; i += 1) {
      for (var j = 0; j < degree; j += 1) {
        result[j] = gfMultiply(result[j], root);

        if (j + 1 < degree) {
          result[j] ^= result[j + 1];
        }
      }

      root = gfMultiply(root, 2);
    }

    return result;
  }

  function reedSolomonRemainder(data, divisor) {
    var result = new Array(divisor.length).fill(0);

    data.forEach(function (byte) {
      var factor = byte ^ result.shift();
      result.push(0);

      divisor.forEach(function (coefficient, index) {
        result[index] ^= gfMultiply(coefficient, factor);
      });
    });

    return result;
  }

  function gfMultiply(x, y) {
    var product = 0;

    while (y > 0) {
      if (y & 1) {
        product ^= x;
      }

      x <<= 1;
      if (x & 0x100) {
        x ^= 0x11d;
      }

      y >>>= 1;
    }

    return product & 0xff;
  }

  function getMask(mask, x, y) {
    if (mask === 0) {
      return (x + y) % 2 === 0;
    }

    return false;
  }

  function getBit(value, index) {
    return ((value >>> index) & 1) !== 0;
  }

  function setReserved(matrix, reserved, x, y, value) {
    matrix[y][x] = value;
    reserved[y][x] = true;
  }

  function makeEmptyMatrix(size) {
    return Array.from({ length: size }, function () {
      return Array.from({ length: size }, function () {
        return false;
      });
    });
  }

  function inBounds(matrix, x, y) {
    return y >= 0 && y < matrix.length && x >= 0 && x < matrix.length;
  }

  function bindDialog() {
    if (!qrClose || !qrDialog) {
      return;
    }

    qrClose.addEventListener("click", function () {
      if (typeof qrDialog.close === "function") {
        qrDialog.close();
      } else {
        qrDialog.removeAttribute("open");
      }
    });
  }

  function setImage(id, imageConfig) {
    var image = document.getElementById(id);

    if (!image || !imageConfig || !hasText(imageConfig.src)) {
      if (image) {
        image.hidden = true;
      }
      return;
    }

    image.src = imageConfig.src;
    image.alt = imageConfig.alt || "";
    image.hidden = false;
  }

  function setText(id, value) {
    var node = document.getElementById(id);

    if (node) {
      node.textContent = value || "";
    }
  }

  function setStatus(message) {
    if (statusMessage) {
      statusMessage.textContent = message;
    }
  }

  function hasText(value) {
    return typeof value === "string" && value.trim().length > 0;
  }

  function getCardUrl(cardConfig) {
    return cardConfig.company.publicCardUrl || window.location.href;
  }

  function getAddressDisplay(address) {
    return address && hasText(address.display) ? address.display : "";
  }

  function getMapHref(address) {
    var display = getAddressDisplay(address);

    if (!address) {
      return "";
    }

    if (hasText(address.mapUrl)) {
      return address.mapUrl;
    }

    if (hasText(display)) {
      return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(display);
    }

    return "";
  }

  function normalizeExternalUrl(url) {
    if (!hasText(url)) {
      return "";
    }

    if (/^(https?:|mailto:|tel:|sms:)/i.test(url)) {
      return url;
    }

    return "https://" + url.replace(/^\/+/, "");
  }
})();
