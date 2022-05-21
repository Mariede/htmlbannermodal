'use strict';

const startBannerModal = () => {
	// ---------------------------------------------------------------
	// Banner CSS

	const setBannerStyle = (bW, bH, mId, mContentClass, mHeaderCloseClass) => {
		const mHeaderCloseHeight = 20; // Modal - header height (shows closing button)
		const mBottomMargin = 40; // Modal - bottom margin

		const bannerStyle = document.createElement('style');

		bannerStyle.innerHTML = `
			:root { /* variables */
				--content-width: ${bW}px;
				--content-width-half: ${bW / 2}px;

				--content-height: ${bH + mHeaderCloseHeight}px;
				--content-height-negative: -${bH + mHeaderCloseHeight}px;

				--content-bottom: ${mBottomMargin}px;
			}

			#${mId} {
				display: block;
				position: fixed;
				z-index: 999;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				overflow: auto;
				background-color: rgba(0,0,0,0.3);

				-webkit-animation-name: fadeIn;
				-webkit-animation-duration: 0.4s;
				animation-name: fadeIn;
				animation-duration: 0.4s;
			}

			#${mId} .${mContentClass} {
				position: fixed;
				left: calc(50% - var(--content-width-half));
				bottom: var(--content-bottom);
				background-color: #fefefe;
				border: 1px solid #888;
				width: var(--content-width);
				height: var(--content-height);
				text-align: left;

				-webkit-animation-name: slideIn;
				-webkit-animation-duration: 0.4s;
				animation-name: slideIn;
				animation-duration: 0.4s;
			}

			#${mId} .${mHeaderCloseClass} {
				padding: 0px 5px;
				color: #aaa;
				float: right;
				font: 18px Arial, sans-serif;
				font-weight: bold;
				height: ${mHeaderCloseHeight}px;
			}

			#${mId} .${mHeaderCloseClass}:hover,
			#${mId} .${mHeaderCloseClass}:focus {
				color: black;
				text-decoration: none;
				cursor: pointer;
			}

			#${mId} img {
				padding: 0;
				margin: 0;
			}

			/* Add Animation */
			@-webkit-keyframes fadeIn {
				from { opacity: 0 }
				to { opacity: 1 }
			}

			@keyframes fadeIn {
				from { opacity: 0 }
				to { opacity: 1 }
			}

			@-webkit-keyframes slideIn {
				from { bottom: var(--content-height-negative); opacity: 0 }
				to { bottom: var(--content-bottom); opacity: 1 }
			}

			@keyframes slideIn {
				from { bottom: var(--content-height-negative); opacity: 0 }
				to { bottom: var(--content-bottom); opacity: 1 }
			}
		`;

		document.head.appendChild(bannerStyle);
	};
	// ---------------------------------------------------------------

	// ---------------------------------------------------------------
	// Definicoes iniciais
	const bannerImgWidth = 784;
	const bannerImgHeight = 295;

	const bannerImgSrc = 'banner-example.png';
	const bannerImgLink = 'https://www.uol.com.br/';
	const bannerImgAlt = 'banner de exemplo';

	const modalId = 'modal-banner-1';
	const modalContentClass = 'modal-content';
	const modalHeaderCloseClass = 'modal-close';
	// ---------------------------------------------------------------

	// ---------------------------------------------------------------
	// Verifica se banner ja esta ativo no DOM e reinicia

	const mAlreadyUp = document.getElementById(modalId);

	if (mAlreadyUp !== null) {
		mAlreadyUp.remove();
	}
	// ---------------------------------------------------------------

	// ---------------------------------------------------------------
	// Prepara CSS

	setBannerStyle(bannerImgWidth, bannerImgHeight, modalId, modalContentClass, modalHeaderCloseClass);
	// ---------------------------------------------------------------

	// ---------------------------------------------------------------
	// Elementos do banner

	const modalBanner = document.createElement('div');
	const modalContent = document.createElement('div');

	const bannerClose = document.createElement('span');
	const bannerLink = document.createElement('a');
	const bannerImage = document.createElement('img');
	// ---------------------------------------------------------------


	// ---------------------------------------------------------------
	// Estrutura DOM

	modalBanner.appendChild(modalContent);
	modalContent.appendChild(bannerClose);
	modalContent.appendChild(bannerLink);
	bannerLink.appendChild(bannerImage);
	// ---------------------------------------------------------------

	// ---------------------------------------------------------------
	// Atributos gerais

	modalBanner.id = modalId; // Caixa modal "outer"
	modalContent.classList.add(modalContentClass); // Caixa modal "inner"
	// ---------------------------------------------------------------

	// ---------------------------------------------------------------
	// Conteudo do banner

	// Botao fechar (banner)
	bannerClose.setAttribute('tabindex', 0);
	bannerClose.classList.add(modalHeaderCloseClass);
	bannerClose.innerHTML = '&times;';

	// Link (banner)
	bannerLink.setAttribute('tabindex', -1);
	bannerLink.setAttribute('href', bannerImgLink);
	bannerLink.setAttribute('target', '_blank');

	// Imagem (banner)
	bannerImage.setAttribute('tabindex', 0);
	bannerImage.setAttribute('src', bannerImgSrc);
	bannerImage.setAttribute('alt', bannerImgAlt);

	bannerImage.setAttribute('width', bannerImgWidth);
	bannerImage.setAttribute('height', bannerImgHeight);
	bannerImage.setAttribute('border', 0);
	// ---------------------------------------------------------------

	// ---------------------------------------------------------------
	// Listeners para remocao do banner

	bannerClose.addEventListener(
		'click',
		() => {
			modalBanner.remove();
			// modalBanner.style.display = 'none';
		},
		{ once: true }
	);

	bannerClose.addEventListener(
		'keypress',
		event => {
			const pressedKey = event.key;

			if (pressedKey === 'Enter') {
				modalBanner.remove();
				// modalBanner.style.display = 'none';
			}
		}
	);

	// Quando o usuario clicar em qualquer lugar fora do banner modal, remove-o
	window.addEventListener(
		'click',
		function _wBannerListener(event) {
			const clickedTarget = event.target;

			if (clickedTarget !== modalContent && clickedTarget !== bannerImage) {
				this.removeEventListener('click', _wBannerListener);
				modalBanner.remove();
				// modalBanner.style.display = 'none';
			}
		}
	);
	// ---------------------------------------------------------------

	// ---------------------------------------------------------------
	// Insere elementos criados no DOM da pagina
	document.body.append(modalBanner);
	// ---------------------------------------------------------------
};

startBannerModal();
