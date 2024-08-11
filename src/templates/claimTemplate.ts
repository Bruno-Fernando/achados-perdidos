interface EmailTemplate {
  userName: string;
  postTitle: string;
  found: boolean;
  senderName: string;
  senderEmail: string;
  message?: string;
}

export const claimTemplate = ({
  userName,
  postTitle,
  found,
  senderName,
  senderEmail,
  message,
}: EmailTemplate) => {
  return `
Olá, ${userName}! O objeto que você postou "${postTitle}" foi ${
    found ? "reivindicado" : "encontrado"
  } por 
${senderName}. <br/>
${
  message
    ? `Ele deixou a seguinte mensagem: <br/> <br/>
${message}`
    : ""
}
<br/> <br/>
O e-mail de contato dele é: ${senderEmail}.
<br/>
Importante: objetos ${
    found ? "reivindicados" : "encontrados"
  } são escondidos da plataforma até que você indique se devem ser mostrados novamente.
<br/>
Caso o objeto seja devolvido, não se esqueça de deletar a postagem.
<br/><br/>
UFCG Finder
`;
};
