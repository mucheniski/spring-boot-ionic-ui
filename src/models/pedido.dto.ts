import { ItemPedidoDTO } from './item-pedido.dto';
import { PagamentoDTO } from './pagamento.dto';
import { RefDTO } from './ref.dto';
export interface PedidoDTO {
  cliente: RefDTO;
  enderecoEntregra: RefDTO;
  pagamento: PagamentoDTO;
  itens: ItemPedidoDTO[];
}
