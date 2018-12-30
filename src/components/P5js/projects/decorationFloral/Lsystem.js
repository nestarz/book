export function Rule(_from, _to)
{
	this.left = _from; // MAPS TO...
	this.right = _to;
}

export function LSystem(p5, _alphabet, _axiom, _rules, _angle, _edgelength = 10)
{
	this.Alphabet = _alphabet;
	this.Axiom = _axiom;
	this.Rules = _rules;
	this.Angle = p5.radians(_angle);
	this.Edge = _edgelength;
	
	this.init = function()
	{
		////console.log("Compare? "+(this.Rules[0].left==this.Axiom));
	}
	this.init();
	
	this.ApplyRules = function(_maxIter)
	{
		this.Axiom = this.Apply(this.Axiom, _maxIter);
	}
	
	this.Apply = function(currentAxiom, maxIterations = 4)
	{
		var newStr = new String();
		
		while(maxIterations-->0)
		{
			for(var c=0; c<currentAxiom.length; c++)
			{
				for(var r=0; r<this.Rules.length; r++)
				{
					if(currentAxiom.charAt(c) == this.Rules[r].left)
					{
						newStr = newStr.concat(this.Rules[r].right);
					}
					else
					{
						newStr = newStr.concat(currentAxiom.charAt(c));
					}
				}
			}
			currentAxiom = newStr;
		}
		
		return currentAxiom;
	}
	
	this.GetAxiom = function()
	{
		return this.Axiom;
	}
	
	this.ExecuteDebug = function()
	{
		ss = new String();
		for(var c=0; c<this.Axiom.length; c++)
		{
			////console.log("Axiom " + this.Axiom);
			switch(this.Axiom.charAt(c))
			{
				case('F'):
					ss = ss.concat("^");
					break;
				case('B'):
					ss = ss.concat("_");
					break;
				case('R'):
					ss = ss.concat(">");
					break;
				case('L'):
					ss = ss.concat("<");
					break;
				default:
					break;
			}
		}
		//console.log(ss);
	}
	
	this.Execute01 = function(initialPosition, initialAngle)
	{
		var currentPosition = initialPosition;
		var currentAngle = p5.radians(initialAngle);

		p5.angleMode(p5.RADIANS);
		
		var positions = [];
		
		var col = 100;
		
		for(var c=0; c<this.Axiom.length; c++)
		{
			switch(this.Axiom.charAt(c))
			{
				case('F'):
					p5.stroke(col);
					var newPos = currentPosition.copy();
					newPos.add(p5.createVector(currentAngle).mult(this.Edge));
					p5.line(currentPosition.x, currentPosition.y, newPos.x, newPos.y);
					currentPosition = newPos;
					break;
				case('B'):
					currentPosition = currentPosition.sub(p5.createVector(currentAngle).mult(this.Edge));
					break;
				case('R'):
					currentAngle += this.Angle;
					break;
				case('L'):
					currentAngle -= this.Angle;					
					break;
				case('['):
					col -= 3;
					positions.push(currentPosition);
					break;
				case(']'):		
					col += 3;	
					if(positions.length == 0)
						//console.log("ERROR Empty position buffer.");
					currentPosition = positions.pop();
					break;
				default:
					////console.log("Unlisted character");
					break;
			}
		}
	}
}
