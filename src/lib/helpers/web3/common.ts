import { ethers, utils, type BigNumberish } from 'ethers';
import { ERC20_ABI } from '../../constants/abis';
import { MAINNET_CHAIN_ID, MVM_CHAIN_ID, MVM_RPC_URL, networkParams } from '../../constants/common';
import type { Network } from '../../types/network';
import toHex from '../utils';

export const mainnetProvider = ethers.getDefaultProvider(1);
export const mvmProvider = ethers.getDefaultProvider(MVM_RPC_URL);

export const getBalance = async ({
	account,
	network,
	unitName = 18
}: {
	account: string;
	network: Network;
	unitName?: BigNumberish;
}) => {
	const provider = network === 'mainnet' ? mainnetProvider : mvmProvider;
	const balance = await provider.getBalance(account);
	return utils.formatUnits(balance, unitName);
};

export const getERC20Balance = async ({
	account,
	contractAddress,
	network,
	unitName = 8
}: {
	account: string;
	contractAddress: string;
	network: Network;
	unitName?: BigNumberish;
}) => {
	const provider = network === 'mainnet' ? mainnetProvider : mvmProvider;
	const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);
	const balance = await contract.balanceOf(account);
	return utils.formatUnits(balance, unitName);
};

export const switchNetwork = async (
	provider: ethers.providers.ExternalProvider,
	network: Network
) => {
	const number = network === 'mainnet' ? MAINNET_CHAIN_ID : MVM_CHAIN_ID;

	try {
		await provider.request?.({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: toHex(number) }]
		});
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (switchError: any) {
		if (switchError.code === 4902) {
			await provider.request?.({
				method: 'wallet_addEthereumChain',
				params: [networkParams[toHex(number)]]
			});
		}
	}
};