(function (w, d, c) {
    // Handle initialization and queued commands
    function handleCommand(command) {
        if (typeof command === 'string') {
            setupWidget(command);  // Assume command is a URL directly
        } else if (command && command[0] === 'configure' && command[1]) {
            // More complex configurations can be handled here
            setupWidget(command[1].AppUrl, command[1].themeColor);
        }
    }

    function isDark(hex) {
        if (!hex) return true;
        var hexColor = hex.replace('#', '');
        var r = parseInt(hexColor.substring(0, 2), 16);
        var g = parseInt(hexColor.substring(2, 4), 16);
        var b = parseInt(hexColor.substring(4, 6), 16);
        return (0.299 * r + 0.587 * g + 0.114 * b) < 128;
    }

    // Setup the iframe and button
    function setupWidget(url, themeColor) {
        var frameContainer = d.createElement('div');
        frameContainer.id = 'frameContainer';
        frameContainer.style.fontFamily = 'sans-serif';
        frameContainer.style.position = 'fixed';
        frameContainer.style.right = '12px';
        frameContainer.style.bottom = '16px';
        frameContainer.style.width = 'calc(100% - 24px)';
        frameContainer.style.maxWidth = '600px';
        frameContainer.style.height = '80%';
        frameContainer.style.border = `1px solid ${themeColor || 'rgba(133, 100, 215)'}`;
        frameContainer.style.borderRadius = '12px';
        frameContainer.style.overflow = 'hidden';
        frameContainer.style.zIndex = '10001';
        // frameContainer.style.display = 'none';
        frameContainer.style.transformOrigin = 'bottom right';
        frameContainer.style.transform = 'scale(0)';
        frameContainer.style.transition = 'transform 0.5s ease';

        // Create the header, which title on the left, and close button on the right
        var header = d.createElement('div');
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
        header.style.padding = '12px';
        header.style.background = themeColor || 'rgba(133, 100, 215)';
        frameContainer.appendChild(header);
        // If the url contains 'chatbot', then set the title to 'Chat'.
        // If the url contains 'enterprise-search', then set the title to 'Search'.
        var title = d.createElement('h3');
        title.style.color = isDark(themeColor) ? 'white' : 'black';
        title.style.margin = '0';
        title.style.fontWeight = 'bold';
        if (url.includes('chatbot')) {
            title.textContent = 'Chat';
        } else if (url.includes('enterprise-search')) {
            title.textContent = 'Search';
        } else {
            title.textContent = 'Epsilla';
        }
        header.appendChild(title);

        var closeButton = d.createElement('button');
        closeButton.style.height = '24px';
        closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke=${isDark(themeColor) ? "white" : "black"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
        closeButton.style.background = 'none';
        closeButton.style.border = 'none';
        closeButton.style.cursor = 'pointer';
        closeButton.onclick = function() {
            frameContainer.style.transform = 'scale(0)';
        }
        header.appendChild(closeButton);

        // Create the iframe
        var iframe = d.createElement('iframe');
        iframe.src = url;
        iframe.style.cssText = 'width: 100%; height: calc(100% - 48px); border: none;';
        frameContainer.appendChild(iframe);

        var button = d.createElement('button');
        button.style.position = 'fixed';
        button.style.right = '12px';
        button.style.bottom = '16px';
        button.style.width = '56px';
        button.style.height = '56px';
        button.style.backgroundColor = themeColor || 'rgba(133, 100, 215)';
        // button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '28px';
        button.style.display = 'flex';
        button.style.justifyContent = 'center';
        button.style.alignItems = 'center';
        button.style.overflow = 'hidden';
        if (url.includes('chatbot')) {
            button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="white" d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2 0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.3-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9l0 0 0 0-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z"/></svg>';
        } else if (url.includes('enterprise-search')) {
            button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="white" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>';
        }
        button.style.fontSize = '16px';
        button.style.cursor = 'pointer';
        button.style.zIndex = '10000';
        // button.onclick = function() {
        //     frameContainer.style.display = frameContainer.style.display === 'none' ? 'block' : 'none';
        // };
        button.onclick = function() {
            if (frameContainer.style.transform === 'scale(1)') {
                frameContainer.style.transform = 'scale(0)';
            } else {
                frameContainer.style.transform = 'scale(1)';
                frameContainer.style.display = 'block';
            }
        };
        d.body.appendChild(frameContainer);
        d.body.appendChild(button);
    }

    // Process any queued commands
    var queuedCommands = w[c].q || [];
    queuedCommands.forEach(handleCommand);

    // Redefine the command function to handle commands immediately
    w[c] = handleCommand;

    // Initialize with the direct URL if available
    if (w.AppUrl) {
      var url = 'https://cloud.epsilla.com/' + w.AppUrl;
      setupWidget(url, w.themeColor);
    }

  })(window, document, 'Epsilla');