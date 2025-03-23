import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {GasComponent} from '../gas/gas.component';

@Component({
  selector: 'app-mbti-result',
  imports: [
    NgIf,
    MatButton,
    GasComponent,
  ],
  templateUrl: './mbti-result.component.html',
  standalone: true,
  styleUrl: './mbti-result.component.css'
})
export class MbtiResultComponent implements OnChanges {

  @Input() selectedAnswers: string[] = []; // Receive the input array
  mbtiType: string = '';
  character: string = '';
  description: string = '';

  compatibleType: string = '';
  compatibilityDescription: string = '';

  currentStep: number = 1; // 1 = Result Screen, 2 = Compatibility Screen
  mbtiImage: string = '';


  private mbtiDescriptions: any = {
    ISTJ: {
      character: "The Inspector",
      description: `
      ISTJs are dependable, responsible, and highly practical. They have a deep respect for tradition and value loyalty above all else.
      Known for their meticulous attention to detail and methodical approach, they excel at creating order from chaos. ISTJs often become the backbone of any organization, ensuring stability and efficiency.
      They may seem reserved, but they are deeply committed to their responsibilities and those they care about. They prefer clear rules and structure, and they thrive in environments that honor reliability and consistency.
    `
    },
    ISFJ: {
      character: "The Protector",
      description: `
      ISFJs are nurturing, warm-hearted, and quietly determined individuals. Often called the defenders, they are driven by a deep sense of duty to protect and support those around them.
      They are compassionate and empathetic, attentive to the needs of others, and often go the extra mile to provide practical help and emotional support. ISFJs value harmony and are skilled at maintaining stability in their relationships and communities.
      Though introverted, they build strong, meaningful connections and take pride in preserving traditions and family values.
    `
    },
    INFJ: {
      character: "The Advocate",
      description: `
      INFJs are insightful visionaries with a profound depth of understanding about the human condition. They are driven by their ideals and strive to make the world a better place.
      Known for their empathy and ability to sense the emotions of others, INFJs are often considered natural counselors. They combine creativity with deep thought, offering unique perspectives and meaningful guidance.
      They are private, complex individuals who carefully select their friends but are fiercely loyal once trust is established. Their strong sense of purpose often leads them to careers in helping professions or causes that promote social good.
    `
    },
    INTJ: {
      character: "The Mastermind",
      description: `
      INTJs are strategic thinkers with a talent for seeing the big picture and devising long-term plans. They are independent, determined, and highly self-confident individuals who love solving complex problems.
      Logical and analytical, INTJs can be perfectionists, constantly striving for improvement and efficiency. They value intelligence and competence and often challenge existing systems to develop innovative solutions.
      Although reserved, they are insightful and decisive leaders who are often ahead of their time. Their ability to envision the future makes them highly respected strategists and architects of change.
    `
    },
    ISTP: {
      character: "The Virtuoso",
      description: `
      ISTPs are pragmatic problem-solvers who thrive on hands-on activities. They have an innate curiosity about how things work and enjoy dismantling and rebuilding things to understand their inner workings.
      Flexible and adaptable, ISTPs are spontaneous and prefer to live in the moment. They value their independence and tend to be reserved, but they are adventurous and love taking risks.
      ISTPs often excel in fields requiring technical skill, precision, and physical agility, making them great engineers, mechanics, or athletes. They are often perceived as calm and collected, even in high-pressure situations.
    `
    },
    ISFP: {
      character: "The Composer",
      description: `
      ISFPs are gentle, kind, and sensitive souls with a deep appreciation for aesthetics and beauty. Often artistic, they express themselves through creative outlets, whether it's art, music, or design.
      They are fiercely independent and value personal freedom, often resisting rigid schedules or expectations. ISFPs live in the present moment, enjoying life's simple pleasures and forming deep connections with nature and animals.
      Compassionate and empathetic, they are attentive to the feelings of others but may be reserved in sharing their own. Their quiet strength and deep values make them loyal and supportive friends.
    `
    },
    INFP: {
      character: "The Mediator",
      description: `
      INFPs are idealistic dreamers with a strong sense of compassion and morality. Guided by their deeply held personal values, they often seek out ways to help others and make a positive difference in the world.
      They are introspective and imaginative, spending much of their time in thoughtful reflection and creative pursuits. INFPs are sensitive to the feelings of others and are drawn to authentic, meaningful connections.
      While they may appear reserved, they possess a rich inner emotional life and an unwavering commitment to causes they believe in. Many INFPs excel in writing, counseling, or artistic careers where they can express their inner vision.
    `
    },
    INTP: {
      character: "The Architect",
      description: `
      INTPs are intellectual explorers who love unraveling complex theories and abstract ideas. Logical and objective, they are driven by a desire to understand how the world works at a fundamental level.
      Independent and reserved, INTPs prefer to work autonomously and often lose themselves in thought as they analyze concepts and brainstorm innovative solutions. They can be perceived as detached, but they are deeply curious and insightful thinkers.
      They value precision and clarity, often seeking truth above social niceties. INTPs are often drawn to careers in science, technology, philosophy, or systems analysis where their analytical skills can shine.
    `
    },
    ESTP: {
      character: "The Dynamo",
      description: `
      ESTPs are energetic, action-oriented, and always ready for adventure. They live in the present and thrive on excitement, often seeking out new experiences and taking bold risks.
      Practical and realistic, ESTPs are excellent at troubleshooting and quick decision-making. They are often persuasive and charismatic, making them natural salespeople or negotiators.
      Their confidence and spontaneity can make them the life of the party, though they can sometimes struggle with long-term planning or patience. ESTPs are driven by results and love fast-paced environments where they can make things happen.
    `
    },
    ESFP: {
      character: "The Entertainer",
      description: `
      ESFPs are outgoing, fun-loving, and spontaneous individuals who bring energy and excitement wherever they go. They are highly attuned to their surroundings and enjoy being the center of attention, often using humor and charm to entertain others.
      They live in the moment and thrive on social interaction, often forming quick connections and making others feel at ease. ESFPs are often drawn to careers in performance, hospitality, or event planning where their enthusiasm and people skills can shine.
      Deeply empathetic, they care about others' feelings and are generous with their time and affection. However, they may sometimes avoid conflict or difficult emotions, preferring to focus on enjoyment and positivity.
    `
    },
    ENFP: {
      character: "The Campaigner",
      description: `
      ENFPs are enthusiastic, creative, and free-spirited individuals who see life as a canvas full of possibilities. They are natural storytellers and charismatic communicators, able to inspire and uplift those around them.
      Driven by their values and ideals, ENFPs are passionate about personal growth, social causes, and helping others reach their potential. They are curious and spontaneous, often exploring new ideas, cultures, and experiences.
      While they are warm and empathetic, they may struggle with routine or follow-through, preferring to live life on their own terms. ENFPs excel in roles that require creativity, empathy, and vision, such as counseling, entrepreneurship, or activism.
    `
    },
    ENTP: {
      character: "The Visionary",
      description: `
      ENTPs are quick-witted, curious, and fiercely independent thinkers. They love exploring new ideas, debating possibilities, and challenging conventional wisdom.
      Natural entrepreneurs and innovators, ENTPs are often found brainstorming inventive solutions and finding new angles on old problems. Their energy and enthusiasm make them captivating communicators, though they can sometimes overwhelm others with their rapid-fire thinking.
      ENTPs dislike routine and are always seeking new intellectual challenges. While they may struggle with practical details, they excel in roles requiring strategy, vision, and creative problem-solving.
    `
    },
    ESTJ: {
      character: "The Executive",
      description: `
      ESTJs are organized, responsible, and reliable leaders who value order and structure. They are pragmatic and grounded in reality, preferring proven methods over speculative ideas.
      ESTJs excel at creating systems, enforcing rules, and maintaining efficiency in both personal and professional environments. They are often found in leadership roles, where their ability to make tough decisions and uphold traditions is respected.
      While they may be seen as rigid, they have a strong sense of duty and loyalty. ESTJs are driven by their sense of responsibility and take pride in their contributions to family, work, and community.
    `
    },
    ESFJ: {
      character: "The Consul",
      description: `
      ESFJs are warm-hearted, conscientious, and sociable individuals who thrive on making others feel valued and cared for. They are natural hosts and coordinators, skilled at bringing people together and fostering harmony in groups.
      Driven by a strong sense of duty, ESFJs are attentive to the needs of those around them and are often the first to offer help. They prefer structure and tradition, often finding comfort in well-established routines and social norms.
      ESFJs excel in careers related to teaching, healthcare, and public service, where their desire to nurture and support others can flourish.
    `
    },
    ENFJ: {
      character: "The Protagonist",
      description: `
      ENFJs are charismatic, empathetic, and inspiring leaders who are passionate about helping others grow and succeed. They have a natural ability to understand people’s emotions and motivations, making them effective communicators and mentors.
      They are driven by their values and ideals, often championing causes that promote social justice and community well-being. ENFJs are organized and strategic, able to turn big visions into actionable plans.
      They thrive in leadership roles and are often found in education, counseling, and activism, where their desire to make a positive impact can shine.
    `
    },
    ENTJ: {
      character: "The Commander",
      description: `
      ENTJs are assertive, strategic, and efficient leaders with a strong drive to achieve their goals. They are natural-born executives who excel at organizing people and resources to accomplish complex objectives.
      Confident and decisive, ENTJs are not afraid to challenge the status quo or make tough decisions. They value competence and efficiency and often have high expectations for themselves and others.
      While they can be perceived as demanding, they are also visionary and inspiring leaders who strive to create lasting impact. ENTJs thrive in roles requiring strategy, leadership, and long-term planning.
    `
    }
  };

  constructor() {}

  // Compatibility pairs (you can adjust this!)
  private compatibilityPairs: any = {
    ISTJ: 'ESFP',
    ISFJ: 'ESTP',
    INFJ: 'ENFP',
    INTJ: 'ENTP',
    ISTP: 'ESFJ',
    ISFP: 'ENFJ',
    INFP: 'ENFJ',
    INTP: 'ENTJ',
    ESTP: 'ISFJ',
    ESFP: 'ISTJ',
    ENFP: 'INFJ',
    ENTP: 'INTJ',
    ESTJ: 'ISFP',
    ESFJ: 'ISTP',
    ENFJ: 'INFP',
    ENTJ: 'INTP'
  };

  private mbtiImages: any = {
    ISTJ: 'assets/images/istj.png',
    ISFJ: 'assets/images/isfj.png',
    INFJ: 'assets/images/infj.png',
    INTJ: 'assets/images/intj.png',
    ISTP: 'assets/images/istp.png',
    ISFP: 'assets/images/isfp.png',
    INFP: 'assets/images/infp.png',
    INTP: 'assets/images/intp.png',
    ESTP: 'assets/images/estp.png',
    ESFP: 'assets/images/esfp.png',
    ENFP: 'assets/images/enfp.png',
    ENTP: 'assets/images/entp.png',
    ESTJ: 'assets/images/estj.png',
    ESFJ: 'assets/images/esfj.png',
    ENFJ: 'assets/images/enfj.png',
    ENTJ: 'assets/images/entj.png'
  };


  ngOnInit(): void {
    this.calculateMBTIType();
    this.getCompatibility();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedAnswers'] && this.selectedAnswers.length > 0) {
    this.calculateMBTIType();
  }
    else {
      this.description = 'Dev';
      this.compatibilityDescription = 'aa';
    }
}

  private calculateMBTIType(): void {
    const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    this.selectedAnswers.forEach(letter => {
      if (counts.hasOwnProperty(letter)) {
        // @ts-ignore
        counts[letter]++
      }
    });

    const first = counts.E >= counts.I ? 'E' : 'I';
    const second = counts.S >= counts.N ? 'S' : 'N';
    const third = counts.T >= counts.F ? 'T' : 'F';
    const fourth = counts.J >= counts.P ? 'J' : 'P';

    this.mbtiType = first + second + third + fourth;

    const mbtiInfo = this.mbtiDescriptions[this.mbtiType];
    this.mbtiImage = this.mbtiImages[this.mbtiType] || 'assets/images/default.png';

    if (mbtiInfo) {
      this.character = mbtiInfo.character;
      this.description = mbtiInfo.description;
    } else {
      this.character = 'Unknown Type';
      this.description = 'No description available for this type.';
    }
  }

  getCompatibility(): void {
    const match = this.compatibilityPairs[this.mbtiType] || 'Unknown';
    const matchInfo = this.mbtiDescriptions[match];

    this.compatibleType = match;
    this.compatibilityDescription = matchInfo
      ? `${matchInfo.character}: ${matchInfo.description}`
      : 'No compatibility description available.';
  }

  nextStep(): void {
    this.currentStep++;
  }

  prevStep(): void {
    this.currentStep--;
  }
}
