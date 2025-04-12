import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

interface QuizQuestion {
  id: number;
  text: string;
  category: string;
  dimension: string;
  selectedValue: number | null;
}

@Component({
  selector: 'app-mbti-likert-quiz',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './mbti-likert-quiz.component.html',
  styleUrls: ['./mbti-likert-quiz.component.css']
})
export class MbtiLikertQuizComponent implements OnInit {
  questions: QuizQuestion[] = [
    {
      id: 1,
      text: 'I prefer brainstorming and discussing ideas with others when working on a task.',
      category: 'Working Style',
      dimension: 'Extraversion vs. Introversion',
      selectedValue: null
    },
    {
      id: 2,
      text: 'I like to think things through on my own before sharing with others.',
      category: 'Working Style',
      dimension: 'Introversion vs. Extraversion',
      selectedValue: null
    },
    {
      id: 3,
      text: 'I prefer learning through facts, details, and step-by-step instructions.',
      category: 'Information Intake',
      dimension: 'Sensing',
      selectedValue: null
    },
    {
      id: 4,
      text: 'I focus on big-picture ideas and future possibilities when learning.',
      category: 'Information Intake',
      dimension: 'Intuition',
      selectedValue: null
    },
    {
      id: 5,
      text: 'I trust information that comes from real-world experiences and evidence.',
      category: 'Information Processing',
      dimension: 'Sensing',
      selectedValue: null
    },
    {
      id: 6,
      text: 'I trust information that is based on patterns, theories, and abstract ideas.',
      category: 'Information Processing',
      dimension: 'Intuition',
      selectedValue: null
    },
    {
      id: 7,
      text: 'When making decisions, I focus on logic, fairness, and objectivity.',
      category: 'Decision-Making',
      dimension: 'Thinking',
      selectedValue: null
    },
    {
      id: 8,
      text: 'When making decisions, I prioritize personal values, empathy, and harmony.',
      category: 'Decision-Making',
      dimension: 'Feeling',
      selectedValue: null
    },
    {
      id: 9,
      text: 'In a group setting, I feel comfortable debating and challenging ideas.',
      category: 'Group Interaction',
      dimension: 'Thinking/Extraversion',
      selectedValue: null
    },
    {
      id: 10,
      text: 'In a group setting, I prefer to consider people\'s feelings and maintain harmony.',
      category: 'Group Interaction',
      dimension: 'Feeling/Introversion',
      selectedValue: null
    },
    {
      id: 11,
      text: 'I like having a structured schedule with clear goals.',
      category: 'Planning',
      dimension: 'Judging',
      selectedValue: null
    },
    {
      id: 12,
      text: 'I prefer flexibility and spontaneity in how I plan things.',
      category: 'Planning',
      dimension: 'Perceiving',
      selectedValue: null
    },
    {
      id: 13,
      text: 'I feel more comfortable when things are organized and decided in advance.',
      category: 'Comfort with Planning',
      dimension: 'Judging',
      selectedValue: null
    },
    {
      id: 14,
      text: 'I feel more comfortable adapting and going with the flow.',
      category: 'Comfort with Planning',
      dimension: 'Perceiving',
      selectedValue: null
    },
    {
      id: 15,
      text: 'My first instinct when facing a problem is to analyze it logically.',
      category: 'Problem-Solving',
      dimension: 'Thinking',
      selectedValue: null
    },
    {
      id: 16,
      text: 'My first instinct when facing a problem is to consider how it affects others emotionally.',
      category: 'Problem-Solving',
      dimension: 'Feeling',
      selectedValue: null
    },
    {
      id: 17,
      text: 'Deadlines and structure help me stay productive.',
      category: 'Work Productivity',
      dimension: 'Judging',
      selectedValue: null
    },
    {
      id: 18,
      text: 'I work best when I follow my inspiration.',
      category: 'Work Productivity',
      dimension: 'Perceiving',
      selectedValue: null
    }
  ];

  currentQuestionIndex = 0;
  quizComplete = false;
  mbtiResult = '';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    // Initialize the first question
    this.currentQuestionIndex = 0;
  }

  selectOption(value: number): void {
    this.questions[this.currentQuestionIndex].selectedValue = value;
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.calculateMBTIResult();
      this.quizComplete = true;
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  calculateMBTIResult(): void {
    // Count the preferences for each dimension
    const counts = {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    };

    // Process each question based on its dimension
    this.questions.forEach(question => {
      if (question.selectedValue === null) return;

      // Convert Likert scale (1-7) to a binary choice
      // Values 1-3 lean toward the first option, 5-7 lean toward the second option
      const value = question.selectedValue;

      if (question.dimension.includes('Extraversion')) {
        if (value <= 3) counts.E++;
        else if (value >= 5) counts.I++;
      } else if (question.dimension.includes('Introversion')) {
        if (value <= 3) counts.I++;
        else if (value >= 5) counts.E++;
      } else if (question.dimension.includes('Sensing')) {
        if (value <= 3) counts.S++;
        else if (value >= 5) counts.N++;
      } else if (question.dimension.includes('Intuition')) {
        if (value <= 3) counts.N++;
        else if (value >= 5) counts.S++;
      } else if (question.dimension.includes('Thinking')) {
        if (value <= 3) counts.T++;
        else if (value >= 5) counts.F++;
      } else if (question.dimension.includes('Feeling')) {
        if (value <= 3) counts.F++;
        else if (value >= 5) counts.T++;
      } else if (question.dimension.includes('Judging')) {
        if (value <= 3) counts.J++;
        else if (value >= 5) counts.P++;
      } else if (question.dimension.includes('Perceiving')) {
        if (value <= 3) counts.P++;
        else if (value >= 5) counts.J++;
      }
    });

    // Determine the MBTI type based on the counts
    const first = counts.E >= counts.I ? 'E' : 'I';
    const second = counts.S >= counts.N ? 'S' : 'N';
    const third = counts.T >= counts.F ? 'T' : 'F';
    const fourth = counts.J >= counts.P ? 'J' : 'P';

    this.mbtiResult = first + second + third + fourth;

    // Store the result in session storage for the result component
    sessionStorage.setItem('mbtiType', this.mbtiResult);

    // Navigate to the result page
    this.router.navigate(['/mbti-result']);
  }

  getCurrentQuestion(): QuizQuestion {
    return this.questions[this.currentQuestionIndex];
  }

  getProgressPercentage(): number {
    return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }
}
