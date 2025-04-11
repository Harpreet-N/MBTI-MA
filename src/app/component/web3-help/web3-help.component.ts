import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';

@Component({
  selector: 'app-web3-help',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './web3-help.component.html',
  styleUrls: ['./web3-help.component.css']
})
export class Web3HelpComponent {
  helpPanels = [
    {
      question: "What is a Web3 wallet?",
      answer: "A Web3 wallet is like your digital keychain. It lets you store your NFTs and crypto, prove who you are without usernames or passwords, and connect to Web3 apps securely."
    },
    {
      question: "What are gas fees?",
      answer: "Gas fees are small transaction costs you pay to use the blockchain. They're like a service fee that helps run the network—just like paying a small fee when transferring money between banks."
    },
    {
      question: "What does 'decentralized' mean?",
      answer: "Decentralized means there's no single company or server in control. Instead, your data and actions are stored across a network, making it more secure and transparent."
    },
    {
      question: "What is a private key?",
      answer: "Your private key is like a secret password that proves you're the owner of your wallet. Keep it safe—anyone with access to it could access your wallet."
    },
    {
      question: "Why do I need a wallet to use Echo?",
      answer: "Your wallet helps you log in, manage your profile, and connect to events and people in a secure and Web3-native way. It's your key to the platform!"
    },
    {
      question: "What makes Web3 different from regular apps?",
      answer: "In Web3, you own your data and identity. There's no need to create a new account or password—you control your access with your wallet."
    }
  ];

  constructor(public router: Router) {
  }
}
