<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\ClassStudent
 *
 * @property int $id
 * @property int $class_id
 * @property int $student_id
 * @property string $academic_year
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\SchoolClass $schoolClass
 * @property-read \App\Models\User $student
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ClassStudent newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClassStudent newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClassStudent query()
 * @method static \Illuminate\Database\Eloquent\Builder|ClassStudent whereAcademicYear($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClassStudent whereClassId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClassStudent whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClassStudent whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClassStudent whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClassStudent whereStudentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClassStudent whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClassStudent active()

 * 
 * @mixin \Eloquent
 */
class ClassStudent extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'class_id',
        'student_id',
        'academic_year',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Get the class that owns the enrollment.
     */
    public function schoolClass(): BelongsTo
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

    /**
     * Get the student that owns the enrollment.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    /**
     * Scope a query to only include active enrollments.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}