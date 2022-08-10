import { ethers } from 'ethers';
import { derived, get, writable } from 'svelte/store';
import { MAINNET_CHAIN_ID, MVM_CHAIN_ID, networkParams } from '../constant';
import toHex from '../helpers/to-hex';
import { clearCachedProvider } from './cached-provider';

interface EtherStore {
	library?: ethers.providers.Web3Provider;
	provider?: ethers.providers.Web3Provider;
	chainId?: number;
	account?: string;
	// network?: string;
}

const store = writable<EtherStore>({});

export const setProvider = async (
	provider: (ethers.providers.ExternalProvider | ethers.providers.JsonRpcFetchFunc) &
		ethers.providers.Web3Provider
) => {
	const library: ethers.providers.Web3Provider = new ethers.providers.Web3Provider(provider);
	const accounts = await library.listAccounts();
	const network = await library.getNetwork();

	const handleChainChanged = (chainId: number) => {
		store.set({
			...get(store),
			chainId: chainId
		});
	};

	const handleDisconnect = () => {
		clearCachedProvider();
		store.set({});
	};

	const handleAccountsChanged = (accounts: string[] | undefined) => {
		if (!accounts || !accounts.length) {
			handleDisconnect();
			return;
		}
		store.set({
			...get(store),
			account: accounts[0]
		});
	};

	get(store).provider?.removeAllListeners();

	store.set({
		provider,
		library,
		account: accounts[0],
		chainId: network.chainId
	});

	provider.on('accountsChanged', handleAccountsChanged);
	provider.on('chainChanged', handleChainChanged);
};

export const provider = derived(store, ($store) => $store.provider);
export const library = derived(store, ($store) => $store.library);
export const chainId = derived(store, ($store) => $store.chainId);
export const account = derived(store, ($store) => $store.account);

const switchNetwork = async (network: string | number) => {
	const library = get(provider);
	if (!library) throw new Error('No provider');

	try {
		await library.provider.request?.({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: toHex(network) }]
		});
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (switchError: any) {
		if (switchError.code === 4902) {
			await library.provider.request?.({
				method: 'wallet_addEthereumChain',
				params: [networkParams[toHex(network)]]
			});
		}
	}
};

export const switchMVM = () => switchNetwork(MVM_CHAIN_ID);
export const switchMainnet = () => switchNetwork(MAINNET_CHAIN_ID);