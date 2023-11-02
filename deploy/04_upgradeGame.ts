import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { diamond } = deployments;

  const { owner } = await getNamedAccounts();

  const deployment = await diamond.deploy('BestOfGame', {
    log: true,
    from: owner,
    owner: owner,

    facets: [
      'BestOfFacet',
      'GameMastersFacet',
      'RequirementsFacet',
      'EIP712InspectorFacet',
      'BestOfInit',
      'GameOwnersFacet',
    ],
  });
};

func.tags = ['upgrade_game'];
func.skip = () => Promise.resolve(process.env.NODE_ENV === 'TEST');
export default func;
