import type { BaseTranslation } from '../i18n-types';

const en: BaseTranslation = {
	meta: {
		title: 'MVM Bridge',
		description: 'The best cross-chain bridge.',
		keywords: {
			crossChainBridge: 'Cross-Chain Bridge',
			bitcoin: 'Bitcoin',
			bridge: 'Bridge',
			ethereumBridge: 'Ethereum Bridge',
			mobileCoinMetaMask: 'MobileCoin MetaMask'
		}
	},
	error: {
		tips: 'Error'
	},
	assets: 'Assets',
	transactions: 'Transactions',
	swap: 'Swap',
	explorer: 'Explorer',
	audit: 'Audit',
	logout: {
		title: 'Log Out',
		description: 'Are you sure want to logout?'
	},
	yes: 'Yes',
	cancel: 'Cancel',
	deposit: 'Deposit',
	withdraw: 'Withdraw',
	searchBar: {
		title: 'Search',
		placeholder: 'Name, Symbol or Address'
	},
	depositModal: {
		title: 'Deposit to MVM',
		qrCode: 'QR Code',
		tips1: 'Deposit will arrive {0:number} block confirmation.',
		tips2: 'Min deposit: 0.00000001 {0:string}.'
	},
	withdrawModal: {
		tips1: 'Withdrawal fee: {0:string} {1:string}',
		tips2: 'Gas fee: {0} ETH'
	},
	from: 'From',
	to: 'To',
	address: 'Address',
	memo: 'Memo',
	allTransactions: 'All Transactions',
	fee: 'Fee',
	balanceOf: 'Balance: {0:string} {1:string}',

	swapPage: {
		tips: {
			price: 'Price:',
			minReceived: 'Min Received:',
			fee: 'Fee:',
			priceImpact: 'Price Impact:',
			warning: 'Lack of liquidity, please decrease swap amount'
		},
		faq: {
			description1: 'How does it work?',
			description2:
				'MVM Bridge provides a cross-chain convert service through 4swap and MixPay, which delivers lower fees, faster transaction speed, and better trading liquidity.',
			description3: '4swap',
			description4:
				'A decentralized protocol for automated liquidity provision offers over 140 pairs with a TVL of over $100M. Please visit ',
			description5: ' for additional information.',
			description6: 'MixPay',
			description7:
				'A decentralized Web3 payment protocol connects the most liquid exchanges, such as Binance, Huobi, and Gate, to convert almost any cryptocurrency. For more info, please visit ',
			description8: '.'
		}
	},
	login: {
		title: 'Login',
		connectBrowserWalletDescription: 'Connect using browser wallet',
		connectWalletConnectDescription: 'Connect using WalletConnect'
	}
};

export default en;