import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {MbtiResultComponent} from '../mbti-result/mbti-result.component';

@Component({
  selector: 'app-quiz',
  imports: [
    MatButton,
    NgForOf,
    MbtiResultComponent,
    NgIf
  ],
  templateUrl: './quiz.component.html',
  standalone: true,
  styleUrl: './quiz.component.css'
})
export class QuizComponent {

  developMode: boolean = false;
  // Array of quiz questions
  quiz = [
    {
      question: "In social situations, I usually…",
      options: [
        {text: "Feel energized when interacting with many people.", value: "E"},
        {text: "Prefer deep one-on-one conversations or being alone.", value: "I"}
      ]
    },
    {
      question: "When working on a task, I prefer…",
      options: [
        {text: "Brainstorming and discussing ideas with others.", value: "E"},
        {text: "Thinking things through on my own before sharing.", value: "I"}
      ]
    },
    {
      question: "When learning new information, I prefer…",
      options: [
        {text: "Facts, details, and step-by-step instructions.", value: "S"},
        {text: "Big-picture ideas and future possibilities.", value: "N"}
      ]
    },
    {
      question: "I trust information that is…",
      options: [
        {text: "Based on real-world experiences and evidence.", value: "S"},
        {text: "Based on patterns, theories, and abstract thinking.", value: "N"}
      ]
    },
    {
      question: "When making decisions, I focus more on…",
      options: [
        {text: "Logic, fairness, and objective analysis.", value: "T"},
        {text: "Feelings, values, and personal impact.", value: "F"}
      ]
    },
    {
      question: "In a group setting, I prefer to…",
      options: [
        {text: "Debate and challenge ideas to find the best solution.", value: "T"},
        {text: "Consider people’s feelings and seek harmony.", value: "F"}
      ]
    },
    {
      question: "When it comes to planning, I prefer…",
      options: [
        {text: "A structured schedule with clear goals.", value: "J"},
        {text: "Flexibility and spontaneity, adjusting as I go.", value: "P"}
      ]
    },
    {
      question: "I feel more comfortable when…",
      options: [
        {text: "Things are organized and decided in advance.", value: "J"},
        {text: "I can adapt and go with the flow.", value: "P"}
      ]
    },
    {
      question: "When facing a problem, my first instinct is to…",
      options: [
        {text: "Analyze it rationally and break it down logically.", value: "T"},
        {text: "Think about how it affects people and emotions.", value: "F"}
      ]
    },
    {
      question: "Which statement feels more true for you?",
      options: [
        {text: "Deadlines and structure help me stay productive.", value: "J"},
        {text: "I work best when I can follow my inspiration.", value: "P"}
      ]
    }
  ];

  currentIndex = 0; // Track the current question index
  selectedAnswers: string[] = []; // Store selected answers
  quizDone: boolean = false;

  // Check if an answer has been selected for the current question
  get isAnswerSelected(): boolean {
    return !!this.selectedAnswers[this.currentIndex];
  }

  // Save the selected answer
  selectAnswer(value: string) {
    this.selectedAnswers[this.currentIndex] = value;
  }

  // Check if an answer is selected for the current question
  isSelected(value: string): boolean {
    return this.selectedAnswers[this.currentIndex] === value;
  }

  // Navigate to the next question
  next() {
    if (this.currentIndex < this.quiz.length - 1 && !this.developMode) {
      this.currentIndex++;
    } else {
      this.quizDone = true;
    }
  }


  // Navigate to the previous question
  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
